var appSettings = require("application-settings");
var dialogs = require("ui/dialogs");
var Observable = require("data/observable").Observable;
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");

function Projects () {

    var _viewModel = new Observable({});
    var viewModel = _viewModel;

    viewModel.load = function(i_object) {
        console.error("LOADD:"+ (i_object ? i_object.firstname + " " + i_object.lastname : "55"))
        if (appSettings.getString("loadingClient") !== "false") {
            viewModel.client = appSettings.getString("loadingClient") || "Click to add client";
            appSettings.setString("loadingClient", "false");
            
        } else {
            viewModel.projectssummary = i_object ? i_object.projectssummary || "" : "";
            viewModel.orig_total = i_object ? i_object.orig_total || "0" : "0";
            viewModel.orig_competion_date = i_object ? i_object.orig_competion_date || "" : "";
            viewModel.contract_date = i_object ? i_object.contract_date || "" : "";
            viewModel.client = i_object ? i_object.firstname + " " + i_object.lastname || "Click to add client" : "Click to add client";
            
            var dateObj;
            dateObj = viewModel.orig_competion_date.split("-");
            viewModel.orig_competion_date_dayy = dateObj.length > 0 ? dateObj[0] || 4 : 4;
            viewModel.orig_competion_date_month = dateObj.length > 1 ? dateObj[1] || 5 : 5;
            viewModel.orig_competion_date_year = dateObj.length > 2 ? dateObj[2] || 2016: 2016;
            
            
            dateObj = viewModel.contract_date.split("-");
            viewModel.contract_date_dayy = dateObj.length > 0 ? dateObj[0] || 4 : 4;
            viewModel.contract_date_month = dateObj.length > 1 ? dateObj[1] || 5 : 5;
            viewModel.contract_date_year = dateObj.length > 2 ? dateObj[2] || 2016 : 2016;

        }
    };
    
    viewModel.startForm = scripts.startForm;
    viewModel.saveForm = scripts.saveForm;
    viewModel.loadForm = function() {
        scripts.loadForm(this);
    };
    viewModel.drop = function() {
        scripts.SQL("DROP TABLE projects");
    };
    
    viewModel.tap = function(i_this) {
        var sqlStatement = (config.clients.select);
        var createNew = "Create new client";
        scripts.SQL(sqlStatement, _process, {ALL:true});
        
        function _process(i_result) {
            if (i_result) {
                var clients = [createNew];
                for (var i=0; i<i_result.length; i++) {
                    clients.push(i_result[i].firstname + " " + i_result[i].lastname);
                }
                dialogs.action({
                    message: "Choose a client",
                    cancelButtonText: "Cancel",
                    actions: clients
                }).then(function (result, i) {

                    console.log("Dialog result: " + result)
                    if (result === createNew) {
                        console.log("create new!");
                        appSettings.setString("loadingClient", "true");
                        appSettings.setString("clientsid", (i_result.length+1)+"");
                        appSettings.setString("client", (i_result.length+1)+"");
                        console.error("clientNEWW: " + (i_result.length+1));
                        scripts.gotoView("clients");
                    
                    } else if (result !== "Cancel") {
                        i_this.object.text = result;
                        for (var i=1; i<clients.length; i++) {
                            if (clients[i] === result) {          
                                i_this.object.index = i;
                                console.log("Dialog index: " + i);
                                appSettings.setString("clientsid", i+"");
                                appSettings.setString("client", i+"");
                                break;
                            }
                        }
                    }

                });
            }

        }
    };
    return viewModel;
    
};

module.exports = Projects;
