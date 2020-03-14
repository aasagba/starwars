export interface IPeopleResponse {
  count: number,
  next: string,
  previous: string,
  results: Array<IPeople>
}

export interface IPeople {
  birth_year: string,
  eye_color: string,
  films: Array<string>,
  gender: string,
  hair_color: string,
  height: string,
  homeworld: string,
  mass: string,
  name: string,
  skin_color: string,
  created: Date,
  edited: Date,
  species: Array<string>,
  starships: Array<string>,
  url: string,
  vehicles: Array<string>
}

export interface ISearchParams {
  searchTerm?: string
}

