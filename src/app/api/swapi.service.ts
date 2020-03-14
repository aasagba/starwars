import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { IPeopleResponse, ISearchParams } from './swapi.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private httpClient: HttpClient){}

  public getStarWarsPeople(searchParams?: ISearchParams):
    Observable<IPeopleResponse | Error> {

    let params: HttpParams = new HttpParams();

    if (searchParams && searchParams.searchTerm) {
      params = params.append('search', searchParams.searchTerm);
    }

    if (searchParams && searchParams.page) {
      params = params.append('page', searchParams.page);
    }

    return this.httpClient
      .get(`${environment.baseUrl}/people`, { params })
      .pipe(map((response: IPeopleResponse) => response),
        catchError((error: Error) => of(new Error(error.message)))
      );
  }

}
