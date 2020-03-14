import { IPeople, IPeopleResponse } from '../../../src/app/api/swapi.interface';

export const mockPeople: Array<IPeople> = [
  {
    name: 'Luke Skywalker',
    height: '172',
    hair_color: 'blond'
  } as IPeople,
  {
    name: 'Han Solo',
    height: '182',
    hair_color: 'brown'
  } as IPeople
];

export const swapiPeopleMock: IPeopleResponse = {
  count: 1,
  next: 'url/2',
  previous: null,
  results: mockPeople
};
