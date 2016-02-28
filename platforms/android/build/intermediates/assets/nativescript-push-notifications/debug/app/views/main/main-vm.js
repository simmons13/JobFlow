var appSettings = require("application-settings");
var observable = require("data/observable");
var scripts = require("../../shared/scripts");
var config = require("../../shared/config");
var ParentModel = require("../../shared/parent-vm");

var MainModel = (function (_super) {
    
    __extends(MainModel, _super);
    __extends(MainModel, ParentModel);
    function MainModel() { 
        _super.call(this);
    }
    
    MainModel.prototype.loadForm = scripts.loadForm;
    MainModel.prototype.saveForm = scripts.saveForm;
    MainModel.prototype.startForm = scripts.startForm;
    MainModel.prototype.gotoView = scripts.gotoView;
    MainModel.prototype.drop = function() {
        scripts.SQL("DROP TABLE details");
        scripts.SQL("DROP TABLE clients");
        scripts.SQL("DROP TABLE projects");
        scripts.SQL("DROP TABLE changes");
        scripts.SQL("DROP TABLE user");
        
    }
    
    return MainModel;
})(observable.Observable);

exports.MainModel = MainModel;
exports.mainViewModel = new MainModel();
