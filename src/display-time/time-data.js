(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "rxjs/internal/Observable", "./time-model"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeData = void 0;
    var axios_1 = require("axios");
    var Observable_1 = require("rxjs/internal/Observable");
    var time_model_1 = require("./time-model");
    var baseUrl = 'http://worldtimeapi.org/api/ip';
    var TimeData = /** @class */ (function () {
        function TimeData() {
        }
        TimeData.prototype.getTimeNow = function () {
            return new Observable_1.Observable(function (observer) {
                axios_1.default
                    .get(baseUrl)
                    .then(function (res) {
                    var fetchedTime = new Date(res.data.datetime);
                    observer.next(new time_model_1.Time(fetchedTime));
                })
                    .catch(function (error) {
                    observer.error(error);
                });
            });
        };
        return TimeData;
    }());
    exports.TimeData = TimeData;
});
