/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPokemonList } from '../store/pokemon.action'
import LazyImage from '../components/LazyImage'
import SearchIcon from '../../shared/inputs/SearchIcon'
import CircleButton from '../../shared/buttons/CircleButton'
import { PlusIcon } from '@heroicons/react/24/solid'
import ListSkeleton from '../components/ListSkeleton'
import { useCombatPokemonContext } from '../contenxt/AddPokemonContext'
import { Link } from 'react-router-dom'

export default function PokemonList() {
  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)
  const { loading, pokemons, error } = useAppSelector((state) => state.pokemons)
  const { addPokemon } = useCombatPokemonContext();

  const [pokemonsData, setPokemonsData] = useState(pokemons)

  useEffect(() => {
    dispatch(getPokemonList())
  }, [dispatch])

  useEffect(() => {
    setPokemonsData(pokemons)
  }, [pokemons])

  const filteredPokemons = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    // Convert to lower case for case insensitive comparison
    const searchValue = searchRef.current?.value.toLowerCase();
    // Filter the pokemons based on search value
    const filtered = pokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchValue!)
    );
    // Update the search result with delay for a better UX
    setTimeout(() => setPokemonsData(filtered), 500)
  };
  if (loading) return <ListSkeleton />
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <SearchIcon ref={searchRef} onChange={filteredPokemons} />
      <div className='flex flex-wrap justify-center gap-5 overflow-scroll scrollbar-hidden min-h-[700px] max-h-[1200px]'>
        {pokemonsData.length > 0 ?pokemonsData.map((pokemon: any) => (
          <div className='relative card' key={pokemon.name}>
            <div className="absolute z-10 right-2 top-2">
              <CircleButton
                icon={<PlusIcon className='text-white size-5' />}
                onClick={() => addPokemon(pokemon)}
              />
            </div>
            <Link
              to={`/pokemons/${pokemon.name}`}

              className="cursor-pointer hover:shadow-2xl transition-shadow duration-300 border border-gray-100 relative flex flex-col items-center justify-center | shadow-xl rounded-xl bg-base-100 w-60 h-72 pt-5">

              <LazyImage url={pokemon.url || ''} name={pokemon.name}
              />
              <h2 className="pt-4 pb-3 text-lg text-center ">{pokemon.name}</h2>
            </Link>
          </div>
        )) : <p className='text-gray-400'>No se encontró pokemones para combatir 😔.</p>
        }
      </div>
    </>
  )
}