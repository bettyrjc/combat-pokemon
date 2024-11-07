import { combineReducers, configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./modules/pokemons/store/reducer/pokemons.reducer";
import pokemonReducer from "./modules/pokemons/store/reducer/pokemon.reducer";
import combatListReducer from "./modules/pokemons/store/reducer/combatList.reducer";

const reducer = combineReducers({
  pokemons: pokemonsReducer,
  pokemon: pokemonReducer,
  combatPokemons: combatListReducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
