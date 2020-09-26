"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Time = void 0;
var axios_1 = require("axios");
var rxjs_1 = require("rxjs");
var Time = /** @class */ (function () {
    function Time() {
    }
    Time.prototype.current = function () {
        var APIPath = 'http://worldtimeapi.org/api/ip';
        return rxjs_1.from(axios_1.default.get(APIPath));
    };
    return Time;
}());
exports.Time = Time;
