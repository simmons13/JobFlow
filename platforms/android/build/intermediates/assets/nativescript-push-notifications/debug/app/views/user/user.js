var User = require("./user-vm");
var scripts = require("../../shared/scripts");
var user = new User();

function pageLoaded(args) {
    var page = args.object;
    scripts.loadForm(page, user);
    page.bindingContext = user;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
