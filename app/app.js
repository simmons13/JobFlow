var application = require("application");
var scripts = require("./shared/scripts");

scripts.setup();

application.mainModule = "views/details/details";
application.cssFile = "./app.css";
application.start();
