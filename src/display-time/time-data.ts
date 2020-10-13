import axios, { AxiosError, AxiosResponse } from 'axios'
import { Observable } from 'rxjs/internal/Observable'
import { Subscriber } from 'rxjs/internal/Subscriber'
import { Time } from './time-model'

const baseUrl = 'http://worldtimeapi.org/api/ip'

export class TimeData {
  public getTimeNow(): Observable<Time> {
    return new Observable((observer: Subscriber<Time>) => {
      axios
        .get(baseUrl)
        .then((res: AxiosResponse) => {
          const fetchedTime = new Date(res.data.datetime)
          observer.next(new Time(fetchedTime))
        })
        .catch((error: AxiosError) => {
          observer.error(error)
        })
    })
  }
}
