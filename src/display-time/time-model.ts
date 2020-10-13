import moment = require('moment')
import { from, Observable, of } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

export class Time {
  private _timeNow: Date
  private _timeString: string
  private _displayMode: 'night' | 'day'

  constructor(currentTime: Date) {
    this._timeNow = currentTime
    this._timeString = this._createTimeString(currentTime)
    this._displayMode = this._createDisplayMode(currentTime)
  }

  // Getters
  get timeNow(): Date {
    return this._timeNow
  }

  get timeString(): string {
    return this._timeString
  }

  get displayMode(): 'night' | 'day' {
    return this._displayMode
  }

  // Methods
  private _createTimeString(dateObject: Date): string {
    return moment(dateObject).format('HH:mm:ss')
  }
  private _createDisplayMode(time: Date): 'night' | 'day' {
    const hour: number = time.getHours()
    if (hour < 6 || hour >= 18) {
      return 'night'
    } else {
      // the default display mode is "day"
      return 'day'
    }
  }
}

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
