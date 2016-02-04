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
    
    return ProjectsModel;
    
})(observable.Observable);

exports.ProjectsModel = ProjectsModel;
exports.projectsViewModel = new ProjectsModel();
