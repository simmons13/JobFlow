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
exports.test = function(arg) {
         
    changes.changedatedirection = changes.changedatedirection == "increase" ? "decrease" : "increase";
    changes.changecostdirection = changes.changecostdirection == "increase" ? "decrease" : "increase";
    //arg.view.text = changes.changedatedirection;
    //page.bindingContext = changes;
    arg.view.set("test",1)
      
};
    

    