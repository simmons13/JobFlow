var Changes = require("./changes-vm");
var scripts = require("../../shared/scripts");
var changes = new Changes();
var page;
function pageLoaded(args) {
    page = args.object;
    scripts.loadForm(page, changes);
    page.bindingContext = changes;
}
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
    

    