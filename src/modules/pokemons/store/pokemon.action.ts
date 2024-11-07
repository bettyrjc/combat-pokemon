import { Dispatch } from "redux";
import {
  setPokemonsLoading,
  setPokemonsSuccess,
  setPokemonsError,
} from "./reducer/pokemons.reducer";
import { httpInstance } from "../../../assets/api";
import {
  setPokemonError,
  setPokemonLoading,
  setPokemonSuccess,
} from "./reducer/pokemon.reducer";
import {  PokemonDetailed } from "../interfaces/Pokemons.interface";
import { PokemonDetailInterface } from "../interfaces/Pokemon.interface";

export const getPokemonList = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setPokemonsLoading());
    const response = await httpInstance.get("/pokemon?limit=151");
    const data = await response.data;
    const results = data.results;

    const pokemonsDetailed = await Promise.all(
      results.map((pokemon: PokemonDetailed) => getPokemonDetailed(pokemon.url))
    );

    const pokeData = pokemonsDetailed.map((pokemon: PokemonDetailInterface) => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites?.other?.dream_world?.front_default,
      };
    });
    dispatch(setPokemonsSuccess(pokeData));
  } catch (error) {
    dispatch(
      setPokemonsError(
        error instanceof Error ? error.message : "An error occurred"
      )
    );
  }
};

const getPokemonDetailed = async (pokemon: string) => {
  const response = await httpInstance.get(pokemon);
  return response.data;
};

export const getPokemonDetail = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(setPokemonLoading());
    const response = await httpInstance.get(`/pokemon/${id}`);
    const data = await response.data;
    dispatch(setPokemonSuccess(data));
  } catch (error) {
    dispatch(
      setPokemonError(
        error instanceof Error ? error.message : "An error occurred"
      )
    );
  }
};

