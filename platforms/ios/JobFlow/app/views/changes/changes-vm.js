var Observable = require("data/observable").Observable;
var scripts = require("../../shared/scripts");

function Changes() {
    
    var _viewModel = new Observable({});
    var viewModel = _viewModel;

    viewModel.load = function(i_object) {
        viewModel.changessummary = i_object ? i_object.changessummary || "" : "";
        viewModel.project = i_object ? i_object.project || "" : "";
        viewModel.changes_total = i_object ? i_object.changes_total || "" : "";
        viewModel.changes_competion_date = i_object ? i_object.changes_competion_date || "" : "";
    
        viewModel.changecost = false;
        viewModel.changedate = false;   
        viewModel.changecostdirection = "increase";   
        viewModel.changedatedirection = "increase";
        
    };
   
    viewModel.startForm = scripts.startForm;
    viewModel.loadForm = scripts.loadForm;
    viewModel.gotoView = scripts.gotoView;
    viewModel.saveForm = scripts.saveForm;
    viewModel.drop = function() {
        scripts.SQL("DROP TABLE changes");
    };
    
    
    /*
    viewModel.changeCostDirection = function(args) {
        console.error(viewModel.changecostdirection);
        this.changecostdirection = viewModel.changecostdirection === "increase" ? "decrease" : "increase";
    };
    
     viewModel.changeDateDirection = function(args) {
        console.error(viewModel.changedatedirection);
        this.changedatedirection = viewModel.changedatedirection === "increase" ? "decrease" : "increase";
    };*/

    return viewModel;
}

module.exports = Changes;

