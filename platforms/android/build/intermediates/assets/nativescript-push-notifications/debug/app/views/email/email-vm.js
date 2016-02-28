var timer = require("timer");
var http = require("http");
var appSettings = require("application-settings");
var emailer = require("nativescript-email");
var composer = require("./composer");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");
var Observable = require("data/observable").Observable;
var scripts = require("../../shared/scripts");

function Email() {
    
    var _viewModel = new Observable({});
    var viewModel = _viewModel;

    viewModel.load = function(i_object) {
        viewModel.userfirstname = i_object ? i_object.userfirstname || "" : "";
        viewModel.userlastname = i_object ? i_object.userlastname || "" : "";
        viewModel.userphone = i_object ? i_object.userphone || "" : "";
        viewModel.usercompanyname = i_object ? i_object.usercompanyname || "" : "";
        viewModel.usercompanylogo = i_object ? i_object.usercompanylogo || "" : "";
    };
    
    viewModel.startForm = scripts.startForm;
    viewModel.loadForm = scripts.loadForm;
    viewModel.gotoView = scripts.gotoView;
    viewModel.saveForm = scripts.saveForm;
    viewModel.drop = function() {
        scripts.SQL("DROP TABLE user");
    };

    viewModel.sendOrder = function () {

        var addChange = config.addChangeUrl +
            "?user=" + appSettings.getString("userid") +
            "&client=" + appSettings.getString("clientsid") +
            "&project=" + appSettings.getString("projectsid") +
            "&change=" + appSettings.getString("changesid");


        console.error("~~RESPONSE:" + addChange);
        //return;

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
                        console.error("RETURN: " + i_response)

                        if (i_response == 1 || i_response == 2) {
                            var sqlAction = config.changes.update;
                            sqlAction = sqlAction.replace("&cond&", "status="+i_response);
                            sqlAction= sqlAction.replace("&changesid&", appSettings.getString("changesid"));
                           
                            timer.clearInterval(id);
                            //scripts.SQL(sqlAction, scripts.goto);
                        } 
                        console.error("RETURN: " + sqlAction);
                        scripts.goto("projectdetails");
                        
                    }, function (e) {
                        // Argument (e) is Error!
                    });

            },
            3000);
            
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
        
        console.error("~~~~: " + sqlAction)
        scripts.SQL(sqlAction, send, {ALL:true});
        
        function send(i_results) {
            
            if (i_results) {
                
                var options = i_results[0] || {};
                options.url = url;
                    
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
        
    };

    return viewModel;
}

module.exports = Email;