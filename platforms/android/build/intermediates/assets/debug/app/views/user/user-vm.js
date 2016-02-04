var observable = require("data/observable");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");

var UserModel = (function (_super) {
    
    __extends(UserModel, _super);
    function UserModel() {
        _super.call(this);
        scripts.startForm();
        scripts.loadForm(this);
    }
    
    UserModel.prototype.startForm = scripts.startForm;
    UserModel.prototype.loadForm = scripts.loadForm;
    UserModel.prototype.gotoView = scripts.gotoView;
    UserModel.prototype.saveForm = scripts.saveForm;
    UserModel.prototype.drop = function() {
        scripts.SQL("DROP TABLE user");
    }
    
    
    return UserModel;
    
})(observable.Observable);

exports.UserModel = UserModel;
exports.userViewModel = new UserModel();
