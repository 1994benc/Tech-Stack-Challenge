import * as moment from 'moment'
import { Subscription } from 'rxjs'
import { Time } from './time-model'

export class DisplayTime {
  // Properties
  private _displayMessage: string
  private _interval: NodeJS.Timer
  private _rxSub: Subscription
  private _displayMode: 'night' | 'day'

  // Getters
  public get displayMessage(): string {
    return this._displayMessage
  }
  public get displayMode(): 'night' | 'day' {
    return this._displayMode
  }

  // Aurelia lifecycle method: attached
  async attached() {
    // Fetch the current time from the API
    await this.fetchCurrentTime()
    // Sends request to get the current time every 10 seconds
    this.automaticReload()
  }

  // Fetch the current time from the API
  public fetchCurrentTime(): void {
    const time = new Time()
    const timeObservable = time.current()
    this._rxSub = timeObservable.subscribe(
      (response) => {
        this._displayMessage = response.timeString
        this._displayMode = response.displayMode
        this._changeDisplayStyle(this._displayMode)
      },
      (error) => {
        this._displayMessage = this._createErrorMessage()
      },
    )
  }

  private _createErrorMessage(): string {
    return 'Error - back soon!'
  }

  // Sends request to get the current time every 10 seconds
  public automaticReload(): void {
    const seconds = 10
    this._interval = setInterval(() => {
      this.fetchCurrentTime()
    }, seconds * 1000)
  }

  private _changeDisplayStyle(mode: 'day' | 'night'): void {
    // Check if the code is running in the browser environment
    if (
    typeof document === 'undefined'
    ) {
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
