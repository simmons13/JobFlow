var Observable = require("data/observable").Observable;
var scripts = require("../../shared/scripts");

function User() {
    
    var _viewModel = new Observable({});
    var viewModel = _viewModel;

    viewModel.load = function(i_object) {
        viewModel.userfirstname = i_object ? i_object.userfirstname || "" : "";
        viewModel.userlastname = i_object ? i_object.userlastname || "" : "";
        viewModel.userphone = i_object ? i_object.userphone || "" : "";
        viewModel.usercompanyname = i_object ? i_object.usercompanyname || "" : "";
        viewModel.usercompanylogo = i_object ? i_object.usercompanylogo || "" : "";
    };
    
    viewModel.startForm = scripts.startForm;
    viewModel.loadForm = scripts.loadForm;
    viewModel.gotoView = scripts.gotoView;
    viewModel.saveForm = scripts.saveForm;
    viewModel.drop = function() {
        scripts.SQL("DROP TABLE user");
    };
    
    return viewModel;
}

module.exports = User;