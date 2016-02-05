var fetchModule = require("fetch");
var timer = require("timer");
var http = require("http");
var emailer = require("nativescript-email");
var composer = require("./composer");
var observable = require("data/observable");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");
var appSettings = require("application-settings");

var EmailModel = (function (_super) {

    __extends(EmailModel, _super);
    function EmailModel() {
        _super.call(this);
    }

    EmailModel.prototype.gotoView = scripts.gotoView;
    EmailModel.prototype.loadForm = scripts.loadForm;
    EmailModel.prototype.saveForm = scripts.saveForm;

    EmailModel.prototype.sendOrder = function () {
        
        var addChange = config.addChangeUrl + 
            "?user=" + appSettings.getString("userid") +
            "&client=" + appSettings.getString("clientsid") +
            "&project=" + appSettings.getString("projectsid") +
            "&change=" + appSettings.getString("changesid");
            
            
                console.error("~~RESPONSE:" + addChange);
                return;
        
        http.getString(addChange).then(
            function (r) {
                // Argument (r) is string!
                console.error("~~RESPONSE:" + addChange);
                console.error("~~RESPONSE:" + r);
                
                // Update change to Waiting on..
                var sqlAction = config.changes.update;
                sqlAction.replace("&cond&", "status=0");
                sqlAction.replace("&changesid&", appSettings.getString("changesid"));
                scripts.SQL(sqlAction);
                
                // Send email to client
                this.sendEmail();
                
                // Update app response set 
                //appSettings("number", "responses");
                
            }, function (e) {
                // Argument (e) is Error!
            });
    
    };

    EmailModel.prototype.requestChange = function() {
        var id = timer.setInterval(
            function () {
                //timer.clearInterval(id);
                var changeExist = config.changeExistUrl
                "?user=" + appSettings.getString("userid") +
                "&client=" + appSettings.getString("clientsid") +
                "&project=" + appSettings.getString("projectsid") +
                "&change=" + appSettings.getString("changesid");
                
                http.getString(changeExist).then(
                    function (r) {
                        if (r == 1 || r == 2) {
                            var sqlAction = config.changes.update;
                            sqlAction.replace("&cond&", "status="+r);
                            sqlAction.replace("&changesid&", appSettings.getString("changesid"));
                        }
                    }, function (e) {
                        // Argument (e) is Error!
                    });
                
            }, 
            180000); //3minutes 
    };
    

    
    EmailModel.prototype.sendEmail = function () {
        console.log("SEND EMAIL: ");
        console.log(appSettings.getString("currentView"));
        
        var options = {};
        options.url = config.acceptChangeUrl;
        var email = email();
        emailer.available().then(function(avail) {
            console.log("Email available? " + avail);
        })
        emailer.compose({
            subject: "Notice of Change Order",
            body: email,//"Click here: http://staciesimmons.com/JobFlow/acceptChange.php?contractor=19055098383&client=greg@gmail.com&project=1&change=1",
            to: ['simmons13@gmail.com']
        }).then(function(r) {
            console.log("Email composer closed");
        });
    };
    

    return EmailModel;

})(observable.Observable);

exports.EmailModel = EmailModel;
exports.emailViewModel = new EmailModel();
