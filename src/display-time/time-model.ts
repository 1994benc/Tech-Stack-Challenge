import moment from 'moment';

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
