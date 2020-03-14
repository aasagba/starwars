import { ISearchState, searchInitialState } from './states.interface';
import { SearchActionTypes, SearchPeopleSuccessAction } from './actions';
import { Action } from '@ngrx/store';

export function searchReducer(
  state: ISearchState = searchInitialState,
  action: Action
): ISearchState {

  switch (action.type) {

    case SearchActionTypes.SEARCH_PEOPLE: {
      return {
        ...state,
        isLoading: true
      };
    }

    case SearchActionTypes.SEARCH_PEOPLE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        people: (action as SearchPeopleSuccessAction).payload.results,
        count: (action as SearchPeopleSuccessAction).payload.count
      };
    }

    case SearchActionTypes.SEARCH_PEOPLE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        count: 0
      }
    }

    default:
      return state;

  }
}
