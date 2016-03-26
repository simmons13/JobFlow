var scripts = require("./scripts");
var config = require("./config");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");

function ProjectsDetailsListViewModel(items) {
    var viewModel = new ObservableArray(items);

    viewModel.load = function() {
        
        // check if uer data exists, if not load user request
        var projectid = appSettings.getString("projectsid");
        var sqlAction = (config.projectdetails.select).replace("&cond&","projectsid =" + projectid);
        var items = config["projectdetails"].properties;
        
        console.error(sqlAction);        
        scripts.SQL(sqlAction, _populate);
        
                                   
        function _populate(i_result) {
            console.error("POPULATE: "+ i_result);
        
            var obj;
            if (i_result) {
                console.error("#### "+i_result.projectsid +": "+i_result.projectssummary);
                viewModel.push({
                    id: i_result.projectsid,
                    projectssummary: i_result.projectssummary,
                    changesummary: i_result.changessummary || "",
                    changes_total: i_result.changes_total ? "$"+i_result.changes_total : "-  ",
                    changes_competion_date: (i_result.changes_competion_date ? "+ "+i_result.changes_competion_date : "-  "),
                    
                    changestatus: config.status[i_result.status],
                    statuscss: config.statuscss[i_result.status],
                    changesid: i_result.changesid
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

module.exports = ProjectsDetailsListViewModel;