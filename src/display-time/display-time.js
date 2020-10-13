var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "rxjs", "rxjs/operators", "./time-data"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DisplayTime = void 0;
    var rxjs_1 = require("rxjs");
    var operators_1 = require("rxjs/operators");
    var time_data_1 = require("./time-data");
    var DisplayTime = /** @class */ (function () {
        function DisplayTime() {
            this._subject = new rxjs_1.Subject();
        }
        Object.defineProperty(DisplayTime.prototype, "displayMessage", {
            // Getters
            get: function () {
                return this._displayMessage;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DisplayTime.prototype, "displayMode", {
            get: function () {
                return this._displayMode;
            },
            enumerable: false,
            configurable: true
        });
        DisplayTime.prototype.attached = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Fetch the current time from the API
                        return [4 /*yield*/, this.fetchCurrentTime()
                            // Sends request to get the current time every 10 seconds
                        ];
                        case 1:
                            // Fetch the current time from the API
                            _a.sent();
                            // Sends request to get the current time every 10 seconds
                            this.automaticReload();
                            return [2 /*return*/];
                    }
                });
            });
        };
        // Fetch the current time from the API
        DisplayTime.prototype.fetchCurrentTime = function () {
            var _this = this;
            var timeData = new time_data_1.TimeData();
            this._rxSub = timeData
                .getTimeNow()
                .pipe(operators_1.takeUntil(this._subject)) // This will unsubscribe the subscription when this._subject becomes true
                .subscribe(function (response) {
                _this._displayMessage = response.timeString;
                _this._displayMode = response.displayMode;
                _this._changeDisplayStyle(_this._displayMode);
            }, function () {
                _this._displayMessage = _this._createErrorMessage();
            });
        };
        DisplayTime.prototype._createErrorMessage = function () {
            return 'Error - back soon!';
        };
        // Sends request to get the current time every 10 seconds
        DisplayTime.prototype.automaticReload = function () {
            var _this = this;
            var seconds = 10;
            this._interval = setInterval(function () {
                if (_this._rxSub) {
                    _this._rxSub.unsubscribe();
                }
                _this.fetchCurrentTime();
            }, seconds * 1000);
        };
        DisplayTime.prototype._changeDisplayStyle = function (mode) {
            // Check if the code is running in the browser environment
            if (typeof document === 'undefined') {
                return;
            }
            // Change the html's styles according to the display mode
            if (mode === 'night') {
                document.documentElement.style.setProperty("--background-color", 'var(--night-background-color)');
                document.documentElement.style.setProperty("--text-color", 'var(--night-text-color)');
            }
            else {
                // the default display mode is "day"
                document.documentElement.style.setProperty("--background-color", 'var(--day-background-color)');
                document.documentElement.style.setProperty("--text-color", 'var(--day-text-color)');
            }
        };
        DisplayTime.prototype.detached = function () {
            clearInterval(this._interval);
            /**
             * Unsubscribe from rxjs subscriptions by setting this._subject = true,
             * this will trigger takeUntil to stop the observable subscriptions
             */
            this._subject.next(true);
        };
        return DisplayTime;
    }());
    exports.DisplayTime = DisplayTime;
});
