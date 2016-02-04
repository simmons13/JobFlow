var ProjectDetailsListViewModel = require("../../shared/projectdetails-list-vm");
var Observable = require("data/observable").Observable;
var appSettings = require("application-settings");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");
var page;

var detailsList = new ProjectDetailsListViewModel([]);
var pageData = new Observable({
    detailsList: detailsList,
    details: ""
});

exports.gotoView = scripts.gotoView;
exports.loaded = function(i_args) {
       
    page = i_args.object;

    // clear specific IDs
    //app.setString("changes","");
    
	// load project details
    var listView = page.getViewById("detailsList");
    page.bindingContext = pageData;
    detailsList.empty();
    detailsList.load();
    listView.animate({
        opacity: 1,
        duration: 1000
    });
     
}


exports.detailsItemTap = function(i_args) {
    
    var obj = i_args.view; 
    var id = obj.bindingContext.id;
    console.error("CHANGE ID:"+id);
    appSettings.setString("change", id+"");
    scripts.gotoView("email");
}
