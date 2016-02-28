var Projects = require("./projects-vm");
var scripts = require("../../shared/scripts");
var projects = new Projects();

function pageLoaded(args) {
    var page = args.object;
    scripts.loadForm(page, projects);
    page.bindingContext = projects;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
