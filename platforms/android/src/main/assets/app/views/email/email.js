var vmModule = require("./email-vm");
var scripts = require("../../shared/scripts");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.emailViewModel;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
