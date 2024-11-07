import { Sprites, Stat, Type } from "./Pokemon.interface";

export interface PokemonInterfaceList {
  count: number;
  next: string;
  previous: null;
  results: PokemonDetailed[];
}
export interface PokemonDetailed {
  name: string;
  url: string;
}
export interface PokemonDetail {
  name: string;
  url?: string;
  id?: string;
  image?: string;
  sprites?: Sprites;
  height?: number;
  types?: Type[];
  stats?: Stat[];
}
