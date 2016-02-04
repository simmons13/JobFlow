var fetchModule = require("fetch");
var email = require("nativescript-email");
var observable = require("data/observable");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");

var ChangesModel = (function (_super) {

    __extends(ChangesModel, _super);
    function ChangesModel() {
        _super.call(this);
    }

    ChangesModel.prototype.gotoView = scripts.gotoView;
    ChangesModel.prototype.loadForm = scripts.loadForm;
    ChangesModel.prototype.saveForm = scripts.saveForm;
    ChangesModel.prototype.startForm = scripts.startForm;
    ChangesModel.prototype.drop = function() {
        scripts.SQL("DROP TABLE changes");
    }
    
    return ChangesModel;

})(observable.Observable);

exports.ChangesModel = ChangesModel;
exports.changesViewModel = new ChangesModel();
