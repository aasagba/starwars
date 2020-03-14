import { createSelector, MemoizedSelector, Selector } from '@ngrx/store';
import { State } from '../../../reducers';
import { ISearchState } from './states.interface';
import { IPeople } from '../../../api/swapi.interface';

export const searchState:
  Selector<State, ISearchState> = (state: State) => {
    return state.search;
  };

export class SearchSelectors {

  public static isLoading: MemoizedSelector<State, boolean> = createSelector(
    searchState,
    (state: ISearchState) => state.isLoading
  );

  public static people: MemoizedSelector<State, Array<IPeople>> = createSelector(
    searchState,
    (state: ISearchState) => state.people
  );

  public static count: MemoizedSelector<State, number> = createSelector(
    searchState,
    (state: ISearchState) => state.count
  );

}
