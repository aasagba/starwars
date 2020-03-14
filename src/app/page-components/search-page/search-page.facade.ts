import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { SearchPeopleAction } from './ngrx/actions';
import { IPeople, ISearchParams } from '../../api/swapi.interface';
import { SearchSelectors } from './ngrx/selectors';

@Injectable()
export class SearchPageFacade {
  public isLoading$: Observable<boolean>;
  public people$: Observable<Array<IPeople>>;
  public count$: Observable<number>;

  constructor(private store: Store<State>) {
    this.isLoading$ = this.store.select(SearchSelectors.isLoading);
    this.people$ = this.store.select(SearchSelectors.people);
    this.count$ = this.store.select(SearchSelectors.count);
  }

  public searchPeople(searchParams?: ISearchParams): void {
    this.store.dispatch(new SearchPeopleAction(searchParams));
  }
}
