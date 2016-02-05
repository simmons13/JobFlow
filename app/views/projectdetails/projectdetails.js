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
    
    var target = i_args.object;
    var index = target.index;

    var selected = detailsList.getItem(i_args.index);
    console.error("~~~~~~~~~~~listView item:"+detailsList.getItem(i_args.index));
    for (s in detailsList.getItem(i_args.index) ) {
        console.error("~~~~~~~~~~~" + s + ":"+ detailsList.getItem(i_args.index)[s]);
    }
    
    console.error("CHANGE ID:"+selected.changesid);
    appSettings.setString("changesid", selected.changesid+"");
    
    scripts.gotoView("email");
}
