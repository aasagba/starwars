import { IPeople } from '../../../api/swapi.interface';

export interface ISearchState {
  isLoading: boolean;
  people: Array<IPeople>
}

export const searchInitialState: ISearchState = {
  isLoading: false,
  people: []
};
