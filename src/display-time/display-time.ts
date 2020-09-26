import axios, { AxiosResponse } from 'axios'
import * as moment from 'moment'
import { from, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'

export class DisplayTime {
  private _displayMessage: string
  private _interval: NodeJS.Timer
  _rxSub: Subscription

  public get displayMessage(): string {
    return this._displayMessage
  }

  async attached() {
    await this.fetchCurrentTime()
    this.automaticReload()
  }

  public fetchCurrentTime(): void {
    const APIPath = 'http://worldtimeapi.org/api/ip'
    const observable = from(axios.get(APIPath))
    this._rxSub = observable.subscribe(
      (response) => {
        const timeString = this.createTimeString(
          new Date(response.data.datetime),
        )
        this._displayMessage = timeString
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

  detached() {
    this._rxSub.unsubscribe()
    clearInterval(this._interval)
  }
}
