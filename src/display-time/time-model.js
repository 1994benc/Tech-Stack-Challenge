(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "moment", "rxjs", "rxjs/operators"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Time = void 0;
    var axios_1 = require("axios");
    var moment = require("moment");
    var rxjs_1 = require("rxjs");
    var operators_1 = require("rxjs/operators");
    var Time = /** @class */ (function () {
        function Time() {
        }
        Time.prototype.current = function () {
            var _this = this;
            var APIPath = 'http://worldtimeapi.org/api/ip';
            return rxjs_1.from(axios_1.default.get(APIPath)).pipe(operators_1.map(function (res) {
                var fetchedTime = new Date(res.data.datetime);
                return {
                    abbreviation: res.data.abbreviation,
                    client_ip: res.data.client_ip,
                    datetime: fetchedTime,
                    timeString: _this._createTimeString(fetchedTime),
                    displayMode: _this._switchDisplayMode(fetchedTime),
                };
            }));
        };
        Time.prototype._createTimeString = function (dateObject) {
            return moment(dateObject).format('HH:mm:ss');
        };
        Time.prototype._switchDisplayMode = function (time) {
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
