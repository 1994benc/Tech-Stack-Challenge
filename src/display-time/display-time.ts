import axios, { AxiosResponse } from 'axios'
import * as moment from 'moment'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export class DisplayTime {
  private _displayMessage: string
  rxSub: Observable<AxiosResponse<any>>

  public get displayMessage(): string {
    return this._displayMessage
  }

  async attached() {
    await this.fetchCurrentTime()
  }

  public fetchCurrentTime(): void {
    const APIPath = 'http://worldtimeapi.org/api/ip'
    this.rxSub = from(axios.get(APIPath))
    this.rxSub.subscribe(
      (response) => {
        const timeString = this.createTimeString(
          new Date(response.data.datetime),
        )
        this._displayMessage = timeString
      },
      () => {
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

  public automaticReload(): void {}

  detached() {}
}
