import { Dispatch } from 'redux'
import { 
  setPokemonsLoading, 
  setPokemonsSuccess, 
  setPokemonsError 
} from './pokemon.reducer'

export const getPokemonList = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setPokemonsLoading())
    const response = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await response.json()
    dispatch(setPokemonsSuccess(data.results))
  } catch (error) {
    dispatch(setPokemonsError(error instanceof Error ? error.message : 'An error occurred'))
  }
}