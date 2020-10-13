(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "moment"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Time = void 0;
    var moment = require("moment");
    var Time = /** @class */ (function () {
        function Time(currentTime) {
            this._timeNow = currentTime;
            this._timeString = this._createTimeString(currentTime);
            this._displayMode = this._createDisplayMode(currentTime);
        }
        Object.defineProperty(Time.prototype, "timeNow", {
            // Getters
            get: function () {
                return this._timeNow;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Time.prototype, "timeString", {
            get: function () {
                return this._timeString;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Time.prototype, "displayMode", {
            get: function () {
                return this._displayMode;
            },
            enumerable: false,
            configurable: true
        });
        // Methods
        Time.prototype._createTimeString = function (dateObject) {
            return moment(dateObject).format('HH:mm:ss');
        };
        Time.prototype._createDisplayMode = function (time) {
            var hour = time.getHours();
            if (hour < 6 || hour >= 18) {
                return 'night';
            }
            else {
                // the default display mode is "day"
                return 'day';
            }
        };
        return Time;
    }());
    exports.Time = Time;
});
