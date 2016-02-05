var observable = require("data/observable");
var scripts = require("../../shared/scripts");

var ClientsModel = (function (_super) {

    __extends(ClientsModel, _super);
    function ClientsModel() {
        _super.call(this);   
        scripts.loadForm(this);
    }

    ClientsModel.prototype.gotoView = scripts.gotoView;
    ClientsModel.prototype.loadForm = scripts.loadForm;
    ClientsModel.prototype.saveForm = scripts.saveForm;
    ClientsModel.prototype.startForm = scripts.startForm;
    ClientsModel.prototype.drop = function() {
        scripts.SQL("DROP TABLE clients");
    }
    
    return ClientsModel;
    
})(observable.Observable);

exports.ClientsModel = ClientsModel;
exports.clientsViewModel = new ClientsModel();
