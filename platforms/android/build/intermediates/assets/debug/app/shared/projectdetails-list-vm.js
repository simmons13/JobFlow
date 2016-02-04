var scripts = require("./scripts");
var config = require("./config");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");

function DetailsListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {
        
        // check if uer data exists, if not load user request
        var projectid = appSettings.getString("projects");
        var sqlAction = (config.projectdetails.select).replace("&cond&","p.id =" + projectid);
        var items = config["projectdetails"].properties;
                
        scripts.SQL(sqlAction, _populate);
        
                                   
        function _populate(i_result) {
            console.error("POPULATE: "+ i_result);
        
            var obj;
            if (i_result) {
                console.error("#### "+i_result.pid +": "+i_result.psummary);
                viewModel.push({
                    id: i_result.cid,
                    summary: i_result.psummary,
                    change: i_result.csummary
                });
            }
        }
    };


    viewModel.empty = function() {
        while (viewModel.length) {
            viewModel.pop();
        }
    };

    viewModel.add = function(grocery) {
            viewModel.push({ name: grocery, id: data.Result.Id });
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