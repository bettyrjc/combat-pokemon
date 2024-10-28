/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

import { getPokemonList } from '../store/pokemon.action'

import SearchInput from '../../shared/inputs/SearchInput'
import CircleButton from '../../shared/buttons/CircleButton'
import LazyImage from '../components/list/LazyImage'
import ListSkeleton from '../components/list/ListSkeleton'
import { useCombatPokemonContext } from '../contenxt/AddPokemonContext'
import { extractUrlId } from '../../shared/common'

export default function PokemonList() {
  const dispatch = useAppDispatch()
  const searchRef = useRef<HTMLInputElement>(null)
  const { loading, pokemons, error } = useAppSelector((state) => state.pokemons)
  const { addPokemon, combatList, deletePokemon } = useCombatPokemonContext();

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

  const handlePokemonToggle = (pokemon: any, isCombat: boolean) => {
    // Extract the id from the url
    //if pokemon is in pokemon list, delete it
    if (isCombat) {
      const id = extractUrlId(pokemon.url)
      deletePokemon(id)
      return;
    }
    //if pokemon is not in pokemon list, add it
    addPokemon(pokemon)
  }


  if (loading) return <ListSkeleton />
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <SearchInput ref={searchRef} onChange={filteredPokemons}
      />
      <div className='flex flex-wrap justify-center gap-5 overflow-scroll scrollbar-hidden min-h-[700px] max-h-[1200px]'>
        {pokemonsData.length > 0 ? pokemonsData.map((pokemon: any) => {
          const isInCombatList = combatList.some(item => item.name === pokemon?.name)
          return (
            <div className='relative card' key={pokemon.name} data-cy={pokemon.name}>
              <div className="absolute z-10 right-2 top-2">
                <CircleButton
                  dataCy={isInCombatList ? "delete-pokemon" : "add-pokemon"}
                  icon={isInCombatList ?
                    <TrashIcon className='text-white size-5' /> :
                    <PlusIcon className='text-white size-5' />
                  }
                  onClick={() => handlePokemonToggle(pokemon, isInCombatList)}
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
          )
        }) : <p className='text-gray-400'>No se encontró pokemones para combatir 😔.</p>
        }
      </div>
    </>
  )
}