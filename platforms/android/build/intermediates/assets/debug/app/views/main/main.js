var vmModule = require("./main-vm");
var scripts = require("../../shared/scripts");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
} 
exports.pageLoaded = pageLoaded;
exports.gotoView = scripts.gotoView;
