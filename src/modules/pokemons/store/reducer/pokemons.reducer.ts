/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonState {
  loading: boolean
  pokemons: any[]
  error: string | null
}

const initialState: PokemonState = {
  loading: false,
  pokemons: [],
  error: null
}

const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setPokemonsLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setPokemonsSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false
      state.pokemons = action.payload
      state.error = null
    },
    setPokemonsError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { 
  setPokemonsLoading, 
  setPokemonsSuccess, 
  setPokemonsError 
} = pokemonsSlice.actions

export default pokemonsSlice.reducer