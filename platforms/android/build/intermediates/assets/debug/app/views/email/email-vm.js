var fetchModule = require("fetch");
var http = require("http");
var emailer = require("nativescript-email");
var composer = require("./composer");
var observable = require("data/observable");
var config = require("../../shared/config");
var scripts = require("../../shared/scripts");

var EmailModel = (function (_super) {

    __extends(EmailModel, _super);
    function EmailModel() {
        _super.call(this);
    }

    EmailModel.prototype.gotoView = scripts.gotoView;
    EmailModel.prototype.loadForm = scripts.loadForm;
    EmailModel.prototype.saveForm = scripts.saveForm;

    EmailModel.prototype.request = function() {
        http.request(
            { url: "http://staciesimmons.com/JobFlow/acceptChange.php?contractor=19055098383&client=greg@gmail.com&project=1&change=1", 
              method: "POST" 
            }).then(function (response) {
            // Argument (response) is HttpResponse!
            // Content property of the response is HttpContent!
            var str = response.content.toString();
            var obj = response.content.toJSON();
            var img = response.content.toImage();
        }, function (e) {
            // Argument (e) is Error!
        });
    }

    EmailModel.prototype.startForm = function() {
        
        this.set("email", composer());
    
    };
    
    EmailModel.prototype.sendEmail = function () {
        console.log("SEND EMAIL: ");
        console.log(appSettings.getString("currentView"));
        
        emailer.available().then(function(avail) {
            console.log("Email available? " + avail);
        })
        emailer.compose({
            subject: "Notice of Change Order",
            body: "Click here: http://staciesimmons.com/JobFlow/acceptChange.php?contractor=19055098383&client=greg@gmail.com&project=1&change=1",
            to: ['simmons13@gmail.com']
        }).then(function(r) {
            console.log("Email composer closed");
        });
    };
    EmailModel.prototype.sendOrder = function () {
        console.log("send :" + config.pushUrl + "?contractor=2147483647&client=greg@gmail.com&project=1&change=1");
        fetchModule.fetch(config.pushUrl + "?contractor=2147483647&client=greg@gmail.com&project=1&change=1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(function (response) {
        if (!response.ok) {
            console.log(JSON.stringify(response));
            throw Error(response.statusText);
        }
        return response;
            })
            .then(function(response) {
                console.log("no error");
                
                // response = response.json();
                //if (response) {
                
                EmailModel.sendEmail();       
                return 1;
            })
            .then(function(data) {
                console.log("token");
                config.token = data.Result.access_token;
            });
        };

    return EmailModel;

})(observable.Observable);

exports.EmailModel = EmailModel;
exports.emailViewModel = new EmailModel();
