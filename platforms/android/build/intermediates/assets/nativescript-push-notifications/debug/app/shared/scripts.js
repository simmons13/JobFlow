var platform = require('platform');
var appSettings = require("application-settings");
var sqlite = require("nativescript-sqlite");
var frameModule = require("ui/frame");
var config = require("./config");

function SQL(sqlstatement, callback, options){

    var bInsert = false;
    /*
    function __storeID(i_results) {
        console.error("ID RESULT: "+ i_results);
        var id = i_results ? i_results["LAST_INSERT_ROWID()"] : null;
        var previousView = appSettings.getString("previousView");
        console.error("ID: "+previousView +":" +id);
        appSettings.setString(previousView, id+"");
    }

    function __getID() {
        console.error("==GETID INSERTed");
        bInsert = false;
        module.exports.SQL("SELECT LAST_INSERT_ROWID()",__storeID);
    }
    */

    function __resultFunction(i_results) {
        console.error("SQL RESULT all: "+ i_results);
        
        if (i_results) {
            if (i_results.length) {
                console.error("SQL RESULT arr: ");
                for (var s=0; s <i_results.length; s++) {
                    console.error("SQL RESULT arr: "+ s + ":" + i_results[s]);
                }
            } else {
                console.error("SQL RESULT obj: ");
                for (s in i_results) {
                    console.error("SQL RESULT obj: "+ s + ":" + i_results[s]);
                }
            }
        }
        if (callback) {
            callback(i_results);
        }
        /*
        if (bInsert) {
            __getID();
        }
        */
    }

    var db = null;
    var db_promise = new sqlite("jobflow_table", function(err, db) {
        if (err) {
            console.error("ERROR", err);
            
        } else {
            db = db;
            // This should ALWAYS be true, db object is open in the "Callback" if no errors occurred
            //console.log("Are we open yet (Inside Callback)? ", db.isOpen() ? "Yes" : "No"); // Yes
        
            bInsert = (sqlstatement.indexOf("INSERT") == 0);
    
            db.resultType(sqlite.RESULTSASOBJECT);    
            if (options && options.ALL) {
                var promise = db.all(sqlstatement, [], 
                    function(err, resultSet) {
                        console.log("ALL:", resultSet);
                         __resultFunction(resultSet);
                    }
                );
            } else {
                var promise = db.each(sqlstatement, [], 
                    function (err, row) {
                        console.log("ROW:", row); // Prints ["Row x Field_1", "Row x Field 2"...] for each row passed to it
                        __resultFunction(row);
                    }
                );
                promise.then(function (count) {
                    console.log("#ROWS:", count); // Prints 100  (Assuming their are a 100 rows found)
                    if (count === 0) {
                        __resultFunction();
                    }
                });
            }
        }
    });

/*
    db_promise.then(function(db) {
        // This should ALWAYS be true, db object is open in the "then"
        console.log("Are we open yet (Inside Promise)? ", db.isOpen() ? "Yes" : "No"); // Yes
        
        db.resultType(sqlite.RESULTSASOBJECT);
        
        bInsert = (sqlstatement.indexOf("INSERT") == 0);
        console.error("SQL WTIH CALLBACK: "+ sqlstatement);
        db.get(sqlstatement, __resultFunction);

        db.close();
    }, function(err) {
        console.error("We failed to open database", err);
    });
    */
    
    //db.resultType(sqlite.RESULTSASOBJECT);
        
  //  console.error("SQL WTIH CALLBACK: "+ sqlstatement);
    //    db.get(sqlstatement, __resultFunction);

    
};

function createSQL (i_view, i_this) {
    var currentView = i_view ? i_view : appSettings.getString("currentView");
    var sqlAction = config[currentView] ? config[currentView].add : "";
    var items = config[currentView] ? config[currentView].properties : [];
    var formId, formItem, viewId;
    var _this = i_this ? i_this : this;

    // go through properties to update SQL
    for (var i=0; i<items.length; i++) {
        formId = items[i].id;
        formItem = _this.get ? _this.get(formId) : '';
        console.error(formId +" "+ formItem);
    
        // replace properties in the view
        if (this[formId] !== undefined) {
            sqlAction = sqlAction.replace("&"+ formId +"&", formItem);
        }
        
        // replace app id stored
        viewId = appSettings.getString(formId) || ""; 
        if (viewId !== "") {
            sqlAction = sqlAction.replace("&"+ formId +"&", viewId);
        } 
    }
    
    return sqlAction;
};


function gotoView (i_args) {

    var sender = i_args.object || {id:i_args};
    var viewObj = sender.id ? sender.id.split("-") : ["details"];
    var view = viewObj[0];
    var viewAction = (viewObj.length === 2) ? viewObj[1] : "";

    // set current view and action
    appSettings.setString("currentView", view);
    appSettings.setString("currentAction", viewAction);

    console.error("====GOTO VIEW:" + view + ":" + viewAction);
    console.error("========USER ID:" + appSettings.getString("userid"));
    console.error("========PROJECT ID:" + appSettings.getString("projectsid"));
    console.error("========CHANGES ID:" + appSettings.getString("changesid"));
    console.error("========CLIENTS ID:" + appSettings.getString("clientsid"));
    
    frameModule.topmost().navigate("views/"+ view +"/"+ view);
  
};

function saveForm (i_this) {
    //var sqlAction = module.exports.createSQL(null, i_this);
    
    var currentView =  appSettings.getString("currentView");
    var currentAction = appSettings.getString("currentAction") || "new";

    var sqlAction = config[currentView] ? config[currentView][currentAction] || "" : "";
    var items = config[currentView] ? config[currentView].properties : [];
    var formId, formItem, viewId;
    var _this = i_this ? i_this : this;

    // go through properties to update SQL
    for (var i=0; i<items.length; i++) {
        formId = items[i].id;
        formItem = this.get(formId);
        console.error(formId +" ++ "+ formItem);
        
        if (currentAction == "new" && 
            formId == "current_competion_date") 
        {
            var origId = formId.replace("current","orig");
            console.error("-----"+origId+"_dayy"+":: "+this.get(origId+"_dayy"))
            var sDate = this.get(origId+"_month") + "-" + 
                        this.get(origId+"_dayy") + "-" + 
                        this.get(origId+"_year");
            sqlAction = sqlAction.replace("&"+ formId +"&", sDate);
        }
        
        if (currentAction == "new" && 
            formId == "current_total") 
        {
            var origId = formId.replace("current","orig");
            var sTotal = this.get(origId);
            sqlAction = sqlAction.replace("&"+ formId +"&", sTotal);
        }
        
        if (formId == "contract_date" || 
            formId == "orig_competion_date" )
            //formId == "changes_competion_date" || 
            //formId == "current_completion_date") 
        {
            console.error("^^^:" + formId+"_dayy" + this.get(formId+"_dayy"))
            var sDate = this.get(formId+"_month") + "-" + 
                        this.get(formId+"_dayy") + "-" + 
                        this.get(formId+"_year");
            sqlAction = sqlAction.replace("&"+ formId +"&", sDate);        
        }
    
        // replace app id stored
        viewId = appSettings.getString(formId) ||
                 appSettings.getString(formId + "sid") || "";         
        if (viewId !== "") {
            sqlAction = sqlAction.replace("&"+ formId +"&", viewId);
        } 
        
        // replace properties in the view
        if (this[formId] !== undefined) {
            console.error(formId +" +1+ "+ formItem);
            sqlAction = sqlAction.replace("&"+ formId +"&", formItem);
        }
        
    }
    
    if (currentView=="user") {
        var uuid = platform.device.uuid;
        sqlAction = sqlAction.replace("&userid&", uuid);
        console.log(uuid); 
    }

    if (currentView=="clients" && 
        appSettings.getString("loadingClient")) 
    {
        appSettings.setString("loadingClient", this.get("firstname") +" "+ this.get("lastname"));
    }
    
    console.error("SAVEFORM: "+sqlAction);
    module.exports.SQL(sqlAction, _gotoNext);
    
    function _gotoNext() {
        var currentView = appSettings.getString("currentView");
        appSettings.setString("previousView", currentView);
        
        console.error("NEXT VIEW:");
        console.error("NEXT VIEW:" + nextView);
        
        var nextView = config[currentView] ? config[currentView].goto : "main";
        module.exports.gotoView(nextView);
    }
};

function startForm () {
    
    var currentView = appSettings.getString("currentView");
    var sqlstatement = config[currentView] ? config[currentView].create : "";
    if (sqlstatement) {
        module.exports.SQL(sqlstatement);
    }
};

function loadForm (i_this, i_model) {
    var _this;
    console.error("\\\\\ LOADD");


    var currentAction = appSettings.getString("currentAction");
     console.error("\\\\\ "+currentAction);

    if (currentAction == "edit") {
    
        var currentView = appSettings.getString("currentView");
        console.error("\\\\\ "+currentView);

        var viewid = appSettings.getString(currentView+"id")    
        console.error("\\\\\ "+viewid);
        
        var sqlAction = config[currentView].select;
        sqlAction = sqlAction + " WHERE " + currentView +"id='" + viewid +"'"; //1;
        
        console.error("\\\\\ "+sqlAction);
        //console.error("\\\\\ "+ this.get("projectssummary"));
        //console.error("\\\\\ "+ i_this.get("projectssummary"));
        
        _this = i_this ? i_this : this;
        module.exports.SQL(sqlAction, _populate, {ALL:true});
    
    } else {
        i_model.load();
        
    }

    function _populate(i_result) {
        var model = i_result && i_result[0] ? i_result[0] : null;
        i_model.load(model);
        _this.bindingContext = i_model;
    }
};


function appData(i_bType, i_sData, i_sValue, i_oOptions) {
    if (i_bType === "string" ) {
        if (i_sData=="userid") {
            var uuid = platform.device.uuid;
            appSettings.setString(i_sData, uuid+"");
        }
    
    } else {
       
        if (i_oOptions && i_oOptions.IFNULL ) {
            if (appSettings.getNumber(i_sData) == null) {
                appSettings.setNumber(i_sData, i_sValue);
            }
        } else {
            appSettings.setNumber(i_sData, i_sValue);
        }
    }
}

function setup() {
    
    SQL(config.user.create);
    SQL(config.projects.create);
    SQL(config.clients.create);
    SQL(config.changes.create);
    
    appSettings.setString("loadingClient", "false");
    
    
    
}

module.exports = {};
module.exports.SQL = SQL;
module.exports.gotoView = gotoView;
module.exports.saveForm = saveForm;
module.exports.startForm = startForm;
module.exports.loadForm = loadForm;
module.exports.createSQL = createSQL;
module.exports.appData = appData;
module.exports.setup = setup;
