import axios, { AxiosResponse } from 'axios'
import { from, Observable } from 'rxjs'

export class Time {
  public current(): Observable<AxiosResponse<any>> {
    const APIPath = 'http://worldtimeapi.org/api/ip'
    return from(axios.get(APIPath))
  }
}
