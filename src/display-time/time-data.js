(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "axios", "rxjs/internal/observable/from", "rxjs/internal/operators/map", "./time-model"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimeData = void 0;
    var axios_1 = require("axios");
    var from_1 = require("rxjs/internal/observable/from");
    var map_1 = require("rxjs/internal/operators/map");
    var time_model_1 = require("./time-model");
    var baseUrl = 'http://worldtimeapi.org/api/ip';
    var TimeData = /** @class */ (function () {
        function TimeData() {
        }
        TimeData.prototype.getTimeNow = function () {
            return from_1.from(axios_1.default.get(baseUrl)).pipe(map_1.map(function (res) {
                var fetchedTime = new Date(res.data.datetime);
                return new time_model_1.Time(fetchedTime);
            }));
        };
        return TimeData;
    }());
    exports.TimeData = TimeData;
});
