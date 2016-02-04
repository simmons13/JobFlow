var vmModule = require("./projects-vm");
var scripts = require("../../shared/scripts");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.projectsViewModel;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
