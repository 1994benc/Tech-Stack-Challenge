import axios from 'axios'
import * as moment from 'moment'

export class DisplayTime {
  private _displayMessage: string

  public get displayMessage(): string {
    return this._displayMessage
  }

  async attached() {
    await this.fetchCurrentTime()
  }

  public fetchCurrentTime(): Promise<string> {
    const APIPath = 'http://worldtimeapi.org/api/ip'
    return new Promise((resolve, reject) => {
      axios
        .get(APIPath)
        .then((response) => {
          const timeString = this.createTimeString(
            new Date(response.data.datetime),
          )
          resolve(timeString)
        })
        .catch((error) => {
          const errorMessage = this.createErrorMessage()
          reject(errorMessage)
        })
    })
  }

  public createTimeString(dateObject: Date): string {
    return moment(dateObject).format('HH:mm:ss')
  }

  public createErrorMessage(): string {
    return 'Error - back soon!'
  }

  public automaticReload(): void {}
}
