import * as moment from 'moment'
import { Subscription } from 'rxjs'
import { Time } from './time-model'

export class DisplayTime {
  private _displayMessage: string
  private _interval: NodeJS.Timer
  private _rxSub: Subscription
  private _displayMode: 'night' | 'day'

  public get displayMessage(): string {
    return this._displayMessage
  }

  public get displayMode(): 'night' | 'day' {
    return this._displayMode
  }

  async attached() {
    await this.fetchCurrentTime()
    this.automaticReload()
  }

  public fetchCurrentTime(): void {
    const time = new Time()
    const timeObservable = time.current()
    this._rxSub = timeObservable.subscribe(
      (response) => {
        const currentDateTime = new Date(response.data.datetime)
        const timeString = this.createTimeString(currentDateTime)
        this._displayMessage = timeString
        this._displayMode = this._switchDisplayMode(currentDateTime)
        this._changeDisplayStyle(this._displayMode)
      },
      (error) => {
        const errorMessage = this.createErrorMessage()
        this._displayMessage = errorMessage
      },
    )
  }

  public createTimeString(dateObject: Date): string {
    return moment(dateObject).format('HH:mm:ss')
  }

  public createErrorMessage(): string {
    return 'Error - back soon!'
  }

  public automaticReload(): void {
    // Sends request to get the current time every 10 seconds
    const seconds = 10
    this._interval = setInterval(() => {
      this.fetchCurrentTime()
    }, seconds * 1000)
  }

  private _switchDisplayMode(time: Date): 'night' | 'day' {
    const hour: number = time.getHours()
    if (hour < 6 || hour >= 18) {
      return 'night'
    } else {
      // the default display mode is "day"
      return 'day'
    }
  }

  private _changeDisplayStyle(mode: 'day' | 'night'): void {

    // Check if the code is running in the browser environment
    if (typeof window === "undefined" || typeof window.document !== "undefined") {
      return
    }

    // Change the html's styles according to the display mode
    if (mode === 'night') {
      document.documentElement.style.setProperty(
        `--background-color`,
        'var(--night-background-color)',
      )
      document.documentElement.style.setProperty(
        `--text-color`,
        'var(--night-text-color)',
      )
    } else {
      // the default display mode is "day"
      document.documentElement.style.setProperty(
        `--background-color`,
        'var(--day-background-color)',
      )
      document.documentElement.style.setProperty(
        `--text-color`,
        'var(--day-text-color)',
      )
    }
  }

  detached() {
    this._rxSub.unsubscribe()
    clearInterval(this._interval)
  }
}
