import { Dispatch } from "redux";
import {
  setPokemonsLoading,
  setPokemonsSuccess,
  setPokemonsError,
} from "./reducer/pokemons.reducer";
import { httpInstance } from "../../../assets/api";
import { setPokemonError, setPokemonLoading, setPokemonSuccess } from "./reducer/pokemon.reducer";

export const getPokemonList = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setPokemonsLoading());
    const response = await httpInstance.get("/pokemon?offset=1&limit=151");
    const data = await response.data;
    dispatch(setPokemonsSuccess(data.results));
  } catch (error) {
    dispatch(
      setPokemonsError(
        error instanceof Error ? error.message : "An error occurred"
      )
    );
  }
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
