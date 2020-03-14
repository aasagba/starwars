import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { IPeopleResponse } from './swapi.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private httpClient: HttpClient){}

  public getStarWarsPeople(): Observable<IPeopleResponse | Error> {

    return this.httpClient
      .get(`${environment.baseUrl}/people`)
      .pipe(map((response: IPeopleResponse) => response),
        catchError((error: Error) => of(new Error(error.message)))
      );
  }

}
