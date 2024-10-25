import { Dispatch } from 'redux'
import { 
  setPokemonsLoading, 
  setPokemonsSuccess, 
  setPokemonsError 
} from './pokemon.reducer'
import { httpInstance } from '../../../assets/api'

export const getPokemonList = () => async (dispatch: Dispatch) => {
  try {
    dispatch(setPokemonsLoading())
    const response = await httpInstance.get('/pokemon?offset=151&limit=151')
    const data = await response.data
    console.log(data)
    dispatch(setPokemonsSuccess(data.results))
  } catch (error) {
    dispatch(setPokemonsError(error instanceof Error ? error.message : 'An error occurred'))
  }
}