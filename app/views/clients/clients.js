var vmModule = require("./clients-vm");
var scripts = require("../../shared/scripts");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.clientsViewModel;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
