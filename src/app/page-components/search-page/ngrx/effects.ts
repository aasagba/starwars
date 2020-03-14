import { Injectable } from '@angular/core';
import { SwapiService } from '../../../api/swapi.service';
import { Action, Store } from '@ngrx/store';
import { State } from '../../../reducers';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  SearchPeopleAction,
  SearchActionTypes,
  SearchPeopleSuccessAction,
  SearchPeopleFailureAction
} from './actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IPeopleResponse } from '../../../api/swapi.interface';

@Injectable()
export class SearchPeopleEffect {

  @Effect()
  public searchPeople$: Observable<Action> = this.actions$.pipe(
    ofType(SearchActionTypes.SEARCH_PEOPLE),
    switchMap((action: SearchPeopleAction) => {
      return this.service.getStarWarsPeople().pipe(
        map((people: IPeopleResponse) =>
          new SearchPeopleSuccessAction(people)),
        catchError((error: Error) => of(
          new SearchPeopleFailureAction(error))
        )
      );
    })
  );

  constructor(
    private store$: Store<State>,
    private actions$: Actions,
    private service: SwapiService
  ) {}
}
