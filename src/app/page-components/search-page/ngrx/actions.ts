import { Action } from '@ngrx/store';
import { IPeopleResponse, ISearchParams } from '../../../api/swapi.interface';

export enum SearchActionTypes {
  SEARCH_PEOPLE = '[People] Search people',
  SEARCH_PEOPLE_SUCCESS= '[People] Search people success',
  SEARCH_PEOPLE_FAILURE= '[People] Search people failure'
}

export class SearchPeopleAction implements Action {
  public readonly type = SearchActionTypes.SEARCH_PEOPLE;

  constructor(public payload: ISearchParams) {}
}

export class SearchPeopleSuccessAction implements Action {
  public readonly type = SearchActionTypes.SEARCH_PEOPLE_SUCCESS;

  constructor(public payload: IPeopleResponse) {}
}

export class SearchPeopleFailureAction implements Action {
  readonly type = SearchActionTypes.SEARCH_PEOPLE_FAILURE;

  constructor(public payload: Error) {}
}

export type SearchActions =
    SearchPeopleAction
  | SearchPeopleSuccessAction
  | SearchPeopleFailureAction;
