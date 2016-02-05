var dialogs = require("ui/dialogs");
var observable = require("data/observable");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");

var ProjectsModel = (function (_super) {

    __extends(ProjectsModel, _super);
    function ProjectsModel() {
        _super.call(this);
    }

    ProjectsModel.prototype.startForm = scripts.startForm;
    ProjectsModel.prototype.loadForm = scripts.loadForm;
    ProjectsModel.prototype.saveForm = scripts.saveForm;
    ProjectsModel.prototype.drop = function() {
        scripts.SQL("DROP TABLE projects");
    };
    ProjectsModel.prototype.tap = function(i_this) {
        var sqlStatement = (config.clients.select);
        var createNew = "Create new client";
        scripts.SQL(sqlStatement, _process, {ALL:true});
        
        _this = i_this.view;

        function _process(i_result) {
            if (i_result) {
                var clients = [createNew];
                for (var i=0; i<i_result.length; i++) {
                    clients.push(i_result[i].firstname + " " + i_result[i].lastname);
                }
                dialogs.action({
                    message: "Choose a client",
                    cancelButtonText: "Cancel",
                    actions: clients
                }).then(function (result, i) {

                    console.log("Dialog result: " + result)
                    if (result === createNew) {
                        // save view,
                        // set action to edit
                        // go to client
                        // come back to PROJECT
                    
                    } else if (result !== "Cancel") {
                        i_this.object.text = result;
                        for (var i=1; i<clients.length; i++) {
                            if (clients[i] === result) {          
                                i_this.object.index = i;
                                break;
                            }
                        }
                    }

                });
            }

        }
    };

    return ProjectsModel;

})(observable.Observable);

exports.ProjectsModel = ProjectsModel;
exports.projectsViewModel = new ProjectsModel();
