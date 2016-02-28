var Observable = require("data/observable").Observable;
var scripts = require("../../shared/scripts");

function Changes() {
    
    var _viewModel = new Observable({});
    var viewModel = _viewModel;

    viewModel.load = function(i_object) {
        viewModel.changessummary = i_object ? i_object.changessummary || "" : "";
        viewModel.project = i_object ? i_object.project || "" : "";
    };
   
    viewModel.startForm = scripts.startForm;
    viewModel.loadForm = scripts.loadForm;
    viewModel.gotoView = scripts.gotoView;
    viewModel.saveForm = scripts.saveForm;
    viewModel.drop = function() {
        scripts.SQL("DROP TABLE changes");
    };
    
    return viewModel;
}

module.exports = Changes;

