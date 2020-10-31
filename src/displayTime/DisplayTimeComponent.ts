import { autoinject, computedFrom } from 'aurelia-framework'
import { Subscription } from 'rxjs'
import { TimeModel } from './TimeModel'
import { TimeProvider } from './TimeProvider'
const ERROR_MESSAGE = 'Error - back soon!'

@autoinject()
export class DisplayTimeComponent {
  private _displayMessage: string
  private _rxSub: Subscription
  private _currentTime: TimeModel

  constructor(private _timeProvider: TimeProvider) {
    this._timeProvider = _timeProvider
  }

  // Getters
  @computedFrom('_currentTime')
  public get isDayLight(): boolean {
    return this._currentTime?.displayMode === 'day'
  }

  @computedFrom('_displayMessage')
  public get displayMessage(): string {
    return this._displayMessage
  }

  // Setters
  public set currentTime(time: TimeModel) {
    this._currentTime = time
    this._displayMessage = time.timeString
  }

  async attached() {
    const intervalDurationMs = 1000 * 10
    this._rxSub = this._timeProvider
      .getTimeStream(intervalDurationMs)
      .subscribe(
        (time) => {
          this.currentTime = time
        },
        (error) => {
          this._displayMessage = ERROR_MESSAGE
        },
      )
  }

  detached() {
    if (this._rxSub) {
      this._rxSub.unsubscribe()
    }
  }
}
