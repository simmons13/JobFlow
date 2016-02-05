var scripts = require("./scripts");
var config = require("./config");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");

function DetailsListViewModel(items) {

    var viewModel = new ObservableArray(items);

    viewModel.load = function() {

        var sqlAction = config["details"].select;// + appSettings.getString("projects");
        var items = config["details"].properties;
        var formId, formItem, viewId;

        // go through properties to update SQL
        for (var i=0; i<items.length; i++) {
            formId = items[i].id;
            formItem = this.get ? this.get(formId) : '';
            console.error(formId +" "+ formItem);

            // replace properties in the view
            if (this[formId] !== undefined) {
                sqlAction = sqlAction.replace("&"+ formId +"&", formItem);
            }

            // replace app id stored
            viewId = appSettings.getString(formId) || "";
            console.error("*******" +formId +"---"+viewId+"*******" );
            if (viewId !== "") {
                sqlAction = sqlAction.replace("&"+ formId +"&", viewId);
            }
        }

        scripts.SQL(sqlAction, _populate);


        function _populate(i_result) {
            console.error("POPULATE: "+ i_result);

            var obj;
            if (i_result) {
                console.error("#### "+i_result.projectsid +": "+i_result.projectssummary);
                viewModel.push({
                    id: i_result.projectsid,
                    summary: i_result.projectssummary,
                    change: i_result.changessummary || "",
                    status: config.status[i_result.status],
                    clientsid: i_result.client,
                    projectsid: i_result.projectsid
                });
            }
        }
    };

    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.get = function(index) {
        return viewModel[index];
    };

    viewModel.delete = function(index) {
        viewModel.splice(index, 1);
    };

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log(JSON.stringify(response));
        throw Error(response.statusText);
    }
    return response;
}

module.exports = DetailsListViewModel;