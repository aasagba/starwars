import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { ISearchState } from '../page-components/search-page/ngrx/states.interface';
import { searchReducer } from '../page-components/search-page/ngrx/reducer';
import { SearchPeopleEffect } from '../page-components/search-page/ngrx/effects';

export interface State {
  search?: ISearchState;
}

export const reducers: ActionReducerMap<State> = {
  search: searchReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const rootEffects: Array<any> = [
  SearchPeopleEffect
];
