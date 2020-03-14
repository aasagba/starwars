import { SearchPeopleAction, SearchPeopleFailureAction, SearchPeopleSuccessAction } from './actions';
import { ISearchState, searchInitialState } from './states.interface';
import { searchReducer } from './reducer';
import { swapiPeopleMock } from '../../../../../test/mock/api/swapi-mock';

const defaultState: ISearchState = searchInitialState;

describe('searchReducer', () => {
  describe('SEARCH_PEOPLE', () => {
    it('should set isLoading to true', () => {
      const action: SearchPeopleAction = new SearchPeopleAction(
      { searchTerm: 'darth vadar' }
      );

      const beforeState: ISearchState = {
        ...defaultState
      };

      const expectedResult: ISearchState = {
        ...beforeState,
        isLoading: true,
      };

      const result: ISearchState = searchReducer(beforeState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SEARCH_PEOPLE_SUCCESS', () => {
    it('should populate people, set count and set loading to false', () => {
      const action: SearchPeopleSuccessAction = new SearchPeopleSuccessAction(
        swapiPeopleMock
      );

      const beforeState: ISearchState = {
        ...defaultState
      };

      const expectedResult: ISearchState = {
        ...beforeState,
        isLoading: false,
        people: swapiPeopleMock.results,
        count: swapiPeopleMock.count
      };

      const result: ISearchState = searchReducer(beforeState, action);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('SEARCH_PEOPLE_FAILURE', () => {
    it('should set isLoading to false and reset count', () => {
      const action: SearchPeopleFailureAction = new SearchPeopleFailureAction(
        new Error('test error')
      );

      const beforeState: ISearchState = {
        ...defaultState
      };

      const expectedResult: ISearchState = {
        ...beforeState,
        isLoading: false,
        count: 0
      };

      const result: ISearchState = searchReducer(beforeState, action);
      expect(result).toEqual(expectedResult);
    });
  });
});
