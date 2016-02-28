var Email = require("./email-vm");
var scripts = require("../../shared/scripts");
var email = new Email();

function pageLoaded(args) {
    var page = args.object;
    scripts.loadForm(page, email);
    page.bindingContext = email;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
