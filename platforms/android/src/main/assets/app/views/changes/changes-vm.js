var timer = require("timer");
var http = require("http");
var appSettings = require("application-settings");
var emailer = require("nativescript-email");
var composer = require("./composer");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");
var Observable = require("data/observable").Observable;

function Changes() {
    
    var _viewModel = new Observable({});
    var changeModel = _viewModel;

    changeModel.load = function(i_object) {
        changeModel.changessummary = i_object ? i_object.changessummary || "" : "";
        changeModel.project = i_object ? i_object.project || "" : "";
        changeModel.changes_total = i_object ? i_object.changes_total || "" : "";
        changeModel.changes_competion_date = i_object ? i_object.changes_competion_date || "" : "";
        changeModel.changestatus = i_object ? config.status[i_object.status] : "";
        changeModel.statuscss = i_object ? config.statuscss[i_object.status] : "";
        changeModel.status = i_object ? i_object.status : -1;
                    
        changeModel.changecost = i_object && i_object.changecost == "true" ? "true" : false;
        changeModel.changedate = i_object &&  i_object.changedate == "true" ? "true" : false;
        changeModel.changecostdirection = i_object ? i_object.changecostdirection || "increase" : "increase";   
        changeModel.changedatedirection = i_object ? i_object.changedatedirection || "increase" : "increase";
        
    };
   
    changeModel.startForm = scripts.startForm;
    changeModel.loadForm = scripts.loadForm;
    changeModel.gotoView = scripts.gotoView;
    changeModel.saveForm = scripts.saveForm;
    changeModel.drop = function() {
        scripts.SQL("DROP TABLE changes");
    };
    
    

    changeModel.sendOrder = function () {

        var addChange = config.addChangeUrl +
            "?user=" + appSettings.getString("userid") +
            "&client=" + appSettings.getString("clientsid") +
            "&project=" + appSettings.getString("projectsid") +
            "&change=" + appSettings.getString("changesid");


        console.error("~~RESPONSE:" + addChange);
        //return;
        http.getString(addChange);
        sendEmail();

        /*
        http.getString(addChange).then(
            function (r) {
                // Argument (r) is string!
                console.error("~~RESPONSE:" + addChange);
                console.error("~~RESPONSE:" + r);

                if (r == 1 || r == 2) {

                    // Update change to Waiting on..
                    var sqlAction = config.changes.update;
                    sqlAction = sqlAction.replace("&cond&", "status=0");
                    sqlAction = sqlAction.replace("&changesid&", appSettings.getString("changesid"));

                    console.error("~~~~: " + sqlAction)
                    scripts.SQL(sqlAction, sendEmail);

                }

                // Update app response set
                //appSettings("number", "responses");

            }, function (e) {
                // Argument (e) is Error!
            });
        */
    };


    function requestChange() {
        console.error("REQUEST:::::")
        var id = timer.setInterval(
            function () {
                var changeExist = config.changeExistUrl +
                    "?user=" + appSettings.getString("userid") +
                    "&client=" + appSettings.getString("clientsid") +
                    "&project=" + appSettings.getString("projectsid") +
                    "&change=" + appSettings.getString("changesid");

                console.error("CHANGES: " + changeExist)
                http.getString(changeExist).then(
                    function (i_response) {
                        function runUpdate() {
                            var sqlAction = appSettings.getString("updateSQL");
                            console.error("RETURN: " + sqlAction);
                            scripts.SQL(sqlAction, scripts.goto);

                        }

                        console.error("RETURN: " + i_response);

                        if (i_response == 1 || i_response == 2) {
                            var sqlAction = config.changes.update;
                            sqlAction = sqlAction.replace("&cond&", "status="+i_response);
                            sqlAction = sqlAction.replace("&changesid&", appSettings.getString("changesid"));
                            
                            timer.clearInterval(id);

                            console.error("RETURN: " + sqlAction);
                            scripts.SQL(sqlAction, runUpdate);


                        } else {
                            var sqlAction = config.changes.update;
                            sqlAction = sqlAction.replace("&cond&", "status="+0);
                            sqlAction= sqlAction.replace("&changesid&", appSettings.getString("changesid"));

                            console.error("RETURN: " + sqlAction);
                            scripts.SQL(sqlAction, scripts.goto);

                        }

                    }, function (e) {
                        // Argument (e) is Error!
                    });

            },
            6000);

            //180000); //3minutes
    };



    function sendEmail () {
        console.log("SEND EMAIL: ");
        console.log(appSettings.getString("currentView"));

        var options = {};
        options.url = config.acceptChangeUrl;

        var url = config.acceptChangeUrl +
            "?user=" + appSettings.getString('userid') +
            "&client=" + appSettings.getString('clientsid') +
            "&project=" + appSettings.getString('projectsid') +
            "&change=" + appSettings.getString('changesid') +
            "&response=";

        var sqlAction = config.email.select;
        sqlAction = sqlAction.replace("&cond&", "changesid = "+appSettings.getString("changesid"));

        console.error("~~~~: " + sqlAction);

        var updateSQL = config.projects.update;
        var sCond = "";
        scripts.SQL(sqlAction, send, {ALL:true});

        function send(i_results) {

            if (i_results) {

                options = i_results[0] || {};
                options.url = url;

                storeUpdateSQL(options);

                 var emailText = composer.create(options);
                console.error(emailText);

                //var email = email();
                emailer.available().then(function(avail) {
                    console.log("Email available? " + avail);
                })
                emailer.compose({
                    subject: "Notice of Change Order",
                    body: emailText,
                    to: [options.email]
                }).then(function(r) {

                    console.log("Email composer closed");
                });

                requestChange();
            }
        }

        function storeUpdateSQL(i_oOpts) {

            if (i_oOpts.changes_total) {
                console.error("changestotal");
                var nNew = parseInt(i_oOpts.current_total) +
                            parseInt(i_oOpts.changes_total);
                sCond += "current_total='"+ nNew +"'";
            }

            if (i_oOpts.changedate) {
                console.error("changesdate");
                var nChangeAmount = parseInt(i_oOpts.changes_competion_date);
                var nNewDate = new Date(i_oOpts.current_competion_date);
                nNewDate.setDate(nNewDate.getDate() + nChangeAmount);
                
                sCond += sCond == "" ? "" : ", ";
                sCond += "current_competion_date='"+
                    (nNewDate.getMonth()+1) + "-" +
                    nNewDate.getDate() + "-" +
                    nNewDate.getFullYear() + "' ";
            }

            updateSQL = updateSQL.replace("&cond&", sCond);
            updateSQL = updateSQL.replace("&projectsid&", appSettings.getString("projectsid"));
            appSettings.setString("updateSQL", updateSQL);

        }
        
    }

    return changeModel;
}

module.exports = Changes;

