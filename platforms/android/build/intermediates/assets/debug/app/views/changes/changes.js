var vmModule = require("./changes-vm");
var scripts = require("../../shared/scripts");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.changesViewModel;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
