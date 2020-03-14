import { SearchSelectors } from './selectors';
import { mockSearchState } from '../../../../../test/mock/data/search-page.mock';
import { State } from '../../../reducers';
import { mockPeople } from '../../../../../test/mock/api/swapi-mock';

const defaultMockState: State = {
  search: mockSearchState
} ;

describe('SearchSelectors', () => {
  describe('isLoading', () => {
    it('should check isLoading is false by default', () => {
      expect(SearchSelectors.isLoading(defaultMockState)).toEqual(false);
    });
  });

  describe('people', () => {
    it('should check that the selector returns people array', () => {
      expect(SearchSelectors.people(defaultMockState)).toEqual(mockPeople);
    });
  });

  describe('count', () => {
    it('should check that the selector returns the search results count', () => {
      expect(SearchSelectors.count(defaultMockState)).toEqual(20);
    });
  });
});
