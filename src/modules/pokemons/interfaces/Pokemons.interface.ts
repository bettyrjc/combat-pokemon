export interface PokemonInterfaceList {
  count: number;
  next: string;
  previous: null;
  results: PokemonDetail[];
}

export interface PokemonDetail {
  name: string;
  url: string;
  id?: string;
  image?: string;
}
