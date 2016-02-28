var DetailsListViewModel = require("../../shared/details-list-vm");
var SubDetailsListViewModel = require("../../shared/subdetails-list-vm");
var Observable = require("data/observable").Observable;
var appSettings = require("application-settings");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");
var page;

var detailsList = new DetailsListViewModel([]);
var subdetailsList = new SubDetailsListViewModel([]);
var pageData = new Observable({
    detailsList: detailsList,
    details: ""
});

exports.test = function() {
    var self = this;
    pushPlugin.register({ senderID: '<ENTER_YOUR_PROJECT_NUMBER>' }, function (data){
        self.set("message", "" + JSON.stringify(data));
    }, function() { });

    pushPlugin.onMessageReceived(function callback(data) {  
        self.set("message", "" + JSON.stringify(data));
    });
}
exports.gotoView = scripts.gotoView;
exports.loaded = function(i_args) {

	page = i_args.object;
    

    scripts.appData("string", "userid");
    scripts.appData("number", "requests", 0, {IFNULL:1});
    
    // clear specific IDs
    //appSettings.setString("changes","");
    //appSettings.setString("projects","");
    //appSettings.setString("clients","");
    
	// check if user data exists, if not load user-new
    var sqlStatement = (config.user.select);
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
            console.error("+++++ GOTO USER");
            scripts.gotoView("user");
            //exports.gotoView("user")
        } else {
            
        }
    
    }
}

exports.listViewItemLoading = function (args) {
    /*
    var listView= args.object;
    console.error("LST: "+listView);
    
  
    
    var sublistView = page.getViewById("detailsList")
    var t = sublistView.get(1)//.color="red";
    console.error("GET1: "+ sublistView.items.length)
    console.error("GET1: "+ sublistView.items.getItem(1))
    console.error("GET1: "+ sublistView.items.getItem(2))
    //sublistView.class="test";
    //sublistView.color="red";
    for ( s in sublistView) {
        console.error("---"+s)
    }
    console.error("SUB1: "+ sublistView)
    console.error("SUB2: "+ sublistView.text)
    console.error("SUB3: "+ page.getViewById("detailsList"))
    console.error("SUB4: "+ page)
    console.error("SUB5: "+ page.getViewById("detailsSublist"))
    console.error("SUB6: "+ listView.getViewById("detailsSublist"))
    console.error("SUB7: "+ listView.get("detailsSublist"))
    console.error("SUB8: "+ page.get("detailsSublist"))
    
    
    var listViewBindingContent = listView.bindingContext;
    listViewBindingContent.set("subdetailsList", subdetailsList);
    subdetailsList.load();    
    //sublistView.animate({
    //    opacity: 1,
    //    duration: 1000
    //});
    console.error("OBS: "+listViewBindingContent);
    
        var listView= args.object;
    console.error("LST: "+listView);
    
    var item = args.view;
    console.error("GRID: "+item);
    
    var itemBindingContext = args.view.bindingContext;
    console.error(itemBindingContext);
    */

}

exports.detailsItemTap = function(i_args) {
    
    var target = i_args.object;
    var index = target.index;

    var selected = detailsList.getItem(i_args.index);
    console.error("~~~~~~~~~~~listView item:"+detailsList.getItem(i_args.index));
    for (s in detailsList.getItem(i_args.index) ) {
        console.error("~~~~~~~~~~~" + s + ":"+ detailsList.getItem(i_args.index)[s]);
    }
    
    appSettings.setString("projectsid", selected.projectsid+"");
    appSettings.setString("clientsid", selected.clientsid+"");
    
    scripts.gotoView("projectdetails");
}
