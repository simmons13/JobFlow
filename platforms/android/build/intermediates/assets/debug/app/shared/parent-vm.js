var sqlite = require("nativescript-sqlite");
var frameModule = require("ui/frame");
var config = require("./config");

var ParentModel = (function () {
    
    function ParentModel() {}
    
    ParentModel.prototype.gotoView = function (args) {
        var sender = args.object;
        var view = sender.id ? sender.id.split("-") : ["main"];
        frameModule.topmost().navigate("views/"+ view[0] +"/"+ view[0]);   
    };
    
    return ParentModel;
})();

exports.ParentModel = ParentModel;
exports.parentwModel = new ParentModel();