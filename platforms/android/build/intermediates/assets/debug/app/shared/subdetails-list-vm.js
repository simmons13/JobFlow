var scripts = require("./scripts");
var config = require("./config");
var ObservableArray = require("data/observable-array").ObservableArray;
var appSettings = require("application-settings");

function SubDetailsListViewModel(items) {

    var viewModel = new ObservableArray(items);
    viewModel.load = function() {

        viewModel.push({
            id: "test",
            summary: "test",
            change: "test",
            status: "test",
            clientsid: "test",
            projectsid: "test"
        });
        viewModel.push({
            id: "test",
            summary: "test",
            change: "test",
            status: "test",
            clientsid: "test",
            projectsid: "test"
        });
        
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

module.exports = SubDetailsListViewModel;