import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./modules/pokemons/store/pokemon.reducer";

const reducer = combineReducers({
  pokemon: pokemonReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
