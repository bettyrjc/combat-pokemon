/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PokemonState {
  loading: boolean
  pokemon: any
  error: string | null
}

const initialState: PokemonState = {
  loading: false,
  pokemon: {},
  error: null
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonLoading: (state) => {
      state.loading = true
      state.error = null
    },
    setPokemonSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false
      state.pokemon = action.payload
      state.error = null
    },
    setPokemonError: (state, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    }
  }
})

export const { 
  setPokemonLoading, 
  setPokemonSuccess, 
  setPokemonError 
} = pokemonSlice.actions

export default pokemonSlice.reducer