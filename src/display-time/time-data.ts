import axios, { AxiosError, AxiosResponse } from 'axios'
import { from } from 'rxjs/internal/observable/from'
import { map } from 'rxjs/internal/operators/map'
import { Time } from './time-model'

const baseUrl = 'http://worldtimeapi.org/api/ip'

export class TimeData {
  public getTimeNow() {
    return from(axios.get(baseUrl)).pipe(
      map((res: AxiosResponse) => {
        const fetchedTime = new Date(res.data.datetime)
        return new Time(fetchedTime)
      }),
    )
  }
}
