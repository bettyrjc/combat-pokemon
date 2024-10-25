/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPokemonList } from '../store/pokemon.action'
import LazyImage from '../components/LazyImage'
import { PokemonDetail } from '../../interfaces/Pokemons.interface'
import SearchIcon from '../../shared/inputs/SearchIcon'
import CircleButton from '../../shared/buttons/CircleButton'
import { PlusIcon } from '@heroicons/react/24/solid'


export default function PokemonList() {
  const dispatch = useAppDispatch()
  const { loading, pokemons, error } = useAppSelector((state) => state.pokemon)

  useEffect(() => {
    dispatch(getPokemonList())
  }, [dispatch])


  const addPokemon = (data: any) => {
    //TODO: add the pokemon to the list
    //TODO: create a store for the selected pokemons
    console.log(data.url)
  }
  //TODO: add a loading spinner
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="w-full col-span-2 px-5">
      {/* input de busqueda */}
      <SearchIcon />
      {/* listado de pokemons */}
      <div className='flex flex-wrap justify-center gap-5 overflow-scroll min-h-[700px] max-h-[1200px]'>
        {pokemons.map((pokemon: PokemonDetail) => (
          <div key={pokemon.name} className=" cursor-pointer hover:shadow-2xl transition-shadow duration-300 relative flex flex-col items-center justify-center | shadow-xl rounded-xl bg-base-100 w-60 pt-5">
            <div className="absolute right-4 top-5">
              <CircleButton
                icon={<PlusIcon className='text-white size-5' />}
                onClick={() => addPokemon(pokemon)}
              />
            </div>
            <LazyImage url={pokemon.url} name={pokemon.name} />
            <h2 className="pt-4 pb-3 text-lg text-center ">{pokemon.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}