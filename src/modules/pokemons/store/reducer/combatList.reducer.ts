import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { PokemonDetail } from '../../interfaces/Pokemons.interface';

export interface PokemonCombat {
  id: string;
  name: string;
  image?: string;
}

export interface CombatPokemonState {
  loading: boolean;
  combatList: PokemonCombat[];
  error: string | null;
}

export const initialState: CombatPokemonState = {
  loading: false,
  combatList: [],
  error: null
};


const combatListReducer = createSlice({
  name: 'combatList',
  initialState,
  reducers: {
    setCombatLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCombatError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addPokemonToCombat: (state, action: PayloadAction<PokemonDetail>) => {
      const data = action.payload;
      const id = data?.id ?? '';
      const isPokemon = state.combatList.some((item: { id: string | undefined; }) => item.id === id);
      if (isPokemon) {
        toast('Este pokemon ya esta en la lista 🤺', {
          icon: 'ℹ️'
        });
        return;
      }

      if (state.combatList.length >= 6) {
        toast.error('No puedes agregar mas de 6 pokemones');
        return;
      }

      const newPokemon: PokemonCombat = {
        id,
        name: data.name,
        image: data.image
      };

      state.combatList.push(newPokemon);
      toast.success(`Has agregado un ${newPokemon.name.toLocaleUpperCase()} a la lista 🤺`);
    },
    deletePokemonFromCombat: (state, action: PayloadAction<string>) => {
      state.combatList = state.combatList.filter((pokemon) => Number(pokemon.id) !== Number(action.payload));
      toast(`Se eliminó el pokemon de la lista 🤺`, {
        icon: '🗑️'
      });
    }
  }
});

export const { 
  setCombatLoading,
  setCombatError,
  addPokemonToCombat,
  deletePokemonFromCombat,
} = combatListReducer.actions;

export default combatListReducer.reducer;
