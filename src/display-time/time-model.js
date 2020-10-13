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
// export interface ITimeData {
//   abbreviation: string
//   client_ip: string
//   datetime: Date
//   timeString: string
//   displayMode: 'night' | 'day'
//   errorMessage?: string
// }
// export class Time {
//   public current(): Observable<ITimeData> {
//     const APIPath = 'http://worldtimeapi.org/api/ip'
//     return from(axios.get(APIPath)).pipe(
//       map((res: AxiosResponse) => {
//         const fetchedTime = new Date(res.data.datetime)
//         return {
//           abbreviation: res.data.abbreviation,
//           client_ip: res.data.client_ip,
//           datetime: fetchedTime,
//           timeString: this._createTimeString(fetchedTime),
//           displayMode: this._switchDisplayMode(fetchedTime),
//         }
//       }),
//     )
//   }
//   private _createTimeString(dateObject: Date): string {
//     return moment(dateObject).format('HH:mm:ss')
//   }
//   private _switchDisplayMode(time: Date): 'night' | 'day' {
//     const hour: number = time.getHours()
//     if (hour < 6 || hour >= 18) {
//       return 'night'
//     } else {
//       // the default display mode is "day"
//       return 'day'
//     }
//   }
// }
