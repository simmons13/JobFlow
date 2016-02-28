var Clients = require("./clients-vm");
var scripts = require("../../shared/scripts");
var clients = new Clients();

function pageLoaded(args) {
    var page = args.object;
    scripts.loadForm(page, clients);
    page.bindingContext = clients;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
