var DetailsListViewModel = require("../../shared/details-list-vm");
var Observable = require("data/observable").Observable;
var appSettings = require("application-settings");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");
var page;

var detailsList = new DetailsListViewModel([]);
var pageData = new Observable({
    detailsList: detailsList,
    details: ""
});

exports.gotoView = scripts.gotoView;
exports.loaded = function(i_args) {

	page = i_args.object;
    
    // clear specific IDs
    //appSettings.setString("changes","");
    //appSettings.setString("projects","");
    //appSettings.setString("clients","");
    
	// check if user data exists, if not load user-new
    var sqlStatement = (config.user.select).replace("&cond&","id=1");
    var _scripts = scripts;
    scripts.SQL(sqlStatement, _process)
    
    var listView = page.getViewById("detailsList");
    page.bindingContext = pageData;
    detailsList.empty();
    detailsList.load();
    listView.animate({
        opacity: 1,
        duration: 1000
    });
            
    function _process(results) {
        console.error("start process");
        if (!results) {
            scripts.gotoView("user");
            //exports.gotoView("user")
        } else {
            
        }
    
    }
}

exports.detailsItemTap = function(i_args) {
    
    var id = i_args && i_args.view ? i_args.view.bindingContext.id : 1;
    console.error("ITEM ID:"+id);
    appSettings.setString("project", id+"");
    scripts.gotoView("projectdetails");
}