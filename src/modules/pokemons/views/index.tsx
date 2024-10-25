import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPokemonList } from '../store/pokemon.action'

export default function PokemonList() {
  const dispatch = useAppDispatch()
  const { loading, pokemons, error } = useAppSelector((state) => state.pokemon)

  useEffect(() => {
    dispatch(getPokemonList())
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="grid gap-4 p-4">
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className="p-4 card bg-base-200">
          <h3 className="text-lg font-bold">{pokemon.name}</h3>
        </div>
      ))}
    </div>
  )
}