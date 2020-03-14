import { IPeople } from '../../../api/swapi.interface';

export interface ISearchState {
  isLoading: boolean;
  people: Array<IPeople>;
  currentPage: number;
  count: number;
}

export const searchInitialState: ISearchState = {
  isLoading: false,
  people: [],
  currentPage: 1,
  count: 0
};
