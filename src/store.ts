import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./modules/pokemons/store/reducer/pokemons.reducer";
import pokemonReducer from "./modules/pokemons/store/reducer/pokemon.reducer";

const reducer = combineReducers({
  pokemons: pokemonsReducer,
  pokemon: pokemonReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
