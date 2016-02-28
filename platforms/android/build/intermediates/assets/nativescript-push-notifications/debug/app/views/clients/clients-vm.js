var Observable = require("data/observable").Observable;
var scripts = require("../../shared/scripts");

function Clients() {
    
    var _viewModel = new Observable({});
    var viewModel = _viewModel;

    viewModel.load = function(i_object) {
        viewModel.firstname = i_object ? i_object.firstname || "" : "";
        viewModel.lastname = i_object ? i_object.lastname || "" : "";
        viewModel.phone = i_object ? i_object.phone || "" : "";
        viewModel.email = i_object ? i_object.email || "" : "";
    };
   
    viewModel.startForm = scripts.startForm;
    viewModel.loadForm = scripts.loadForm;
    viewModel.gotoView = scripts.gotoView;
    viewModel.saveForm = scripts.saveForm;
    viewModel.drop = function() {
        scripts.SQL("DROP TABLE clients");
    };
    
    return viewModel;
}

module.exports = Clients;

