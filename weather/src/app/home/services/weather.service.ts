import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { IDataResponse, IParams } from '../models/interfaces';

@Injectable()
export class WeatherService {
  constructor(private http: HttpClient) {}

  getMetricsForInterval(params: IParams): Observable<IDataResponse[]> {
    const url = `${environment.API_ENDPOINT}/metoffice/${params.metric}-${
      params.location
    }.json`;
    return this.http.get(url).pipe(map((data) => data as IDataResponse[]));
  }
}
