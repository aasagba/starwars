import { ISearchState } from '../../../src/app/page-components/search-page/ngrx/states.interface';
import { mockPeople } from '../api/swapi-mock';

export const mockSearchState: ISearchState = {
  isLoading: false,
  people: [...mockPeople],
  currentPage: 1,
  count: 20
};
