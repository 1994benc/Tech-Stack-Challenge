import { Subject, Subscription } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { TimeData } from './time-data'

export class DisplayTime {
  // Properties
  private _displayMessage: string
  private _interval: NodeJS.Timer
  private _displayMode: 'night' | 'day'
  private _subject: Subject<boolean> = new Subject<boolean>()
  private _rxSub: Subscription

  // Getters
  public get displayMessage(): string {
    return this._displayMessage
  }
  public get displayMode(): 'night' | 'day' {
    return this._displayMode
  }

  async attached() {
    // Fetch the current time from the API
    await this.fetchCurrentTime()
    // Sends request to get the current time every 10 seconds
    this.automaticReload()
  }

  // Fetch the current time from the API
  public fetchCurrentTime(): void {
    const timeData = new TimeData()
    this._rxSub = timeData
      .getTimeNow()
      .pipe(takeUntil(this._subject)) // This will unsubscribe the subscription when this._subject becomes true
      .subscribe(
        (response) => {
          this._displayMessage = response.timeString
          this._displayMode = response.displayMode
          this._changeDisplayStyle(this._displayMode)
        },
        () => {
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
      // Unsubscribe to the previous subscription before creating a new one
      if (this._rxSub) {
        this._rxSub.unsubscribe()
      }
      this.fetchCurrentTime()
    }, seconds * 1000)
  }

  private _changeDisplayStyle(mode: 'day' | 'night'): void {
    // Check if the code is running in the browser environment
    // So that Cucumber tests will not fail because of the undefined document object
    if (typeof document === 'undefined') {
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
    clearInterval(this._interval)
    /**
     * Unsubscribe from rxjs subscriptions by setting this._subject = true,
     * this will trigger takeUntil to stop the observable subscriptions
     */
    this._subject.next(true)
  }
}
