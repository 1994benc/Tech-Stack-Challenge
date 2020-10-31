import axios, { AxiosError, AxiosResponse } from 'axios';
import { from, interval } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { startWith, switchMap } from 'rxjs/operators';
import { TimeModel } from './TimeModel';

const BASE_URL = 'http://worldtimeapi.org/api/ip';

export class TimeProvider {
  public getTimeStream(durationMs: number): Observable<TimeModel> {
    const int = interval(durationMs);
    return int.pipe(
      startWith(0),
      switchMap(() => from(this.getTime())),
    );
  }

  private getTime(): Promise<TimeModel> {
    return axios
      .get(BASE_URL)
      .then((res: AxiosResponse) => {
        const fetchedTime = new Date(res.data.datetime);
        return new TimeModel(fetchedTime);
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  }
}
