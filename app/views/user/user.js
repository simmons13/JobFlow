var vmModule = require("./user-vm");
var scripts = require("../../shared/scripts");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.userViewModel;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
