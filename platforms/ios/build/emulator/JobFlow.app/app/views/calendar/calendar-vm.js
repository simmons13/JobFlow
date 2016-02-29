var calendarModule = require("nativescript-telerik-ui/calendar");
var observableModule = require("data/observable");

var CalendarModel = (function (_super) {
    __extends(CalendarModel, _super);
    function CalendarModel() {
        _super.call(this);
        this.viewMode = calendarModule.CalendarViewMode.Month;
    }
    Object.defineProperty(CalendarModel.prototype, "viewMode", {
        get: function () {
            return this.get("ViewMode");
        },
        set: function (value) {
            this.set("ViewMode", value);
        },
        enumerable: true,
        configurable: true
    });
    CalendarModel.prototype.setViewMode = function (viewMode) {
        this.viewMode = viewMode;
    };
    
    return CalendarModel;
    
})(observableModule.Observable);
exports.CalendarModel = CalendarModel;
exports.calendarViewModel = new CalendarModel();