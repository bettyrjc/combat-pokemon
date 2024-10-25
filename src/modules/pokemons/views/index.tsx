import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { getPokemonList } from '../store/pokemon.action'
import LazyImage from '../components/LazyImage'

export default function PokemonList() {
  const dispatch = useAppDispatch()
  const { loading, pokemons, error } = useAppSelector((state) => state.pokemon)

  useEffect(() => {
    dispatch(getPokemonList())
  }, [dispatch])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
    {pokemons.map((pokemon) => (
      <div key={pokemon.name}>
        <h3>{pokemon.name}</h3>
        <LazyImage url={pokemon.url} name={pokemon.name} />
      </div>
    ))}
  </div>
  )
}