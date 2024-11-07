/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPokemonDetail } from "../store/pokemon.action";
import { statsName } from "../../../assets/mocks/statName";
import NotFoundPokemon from "../components/detail/NotFoundPokemon";
import PokemonDetailSkeleton from '../components/detail/PokemonDetailSkeleton';
import StatsDetail from '../components/detail/StatsDetail';
import { addPokemonToCombat, deletePokemonFromCombat, PokemonCombat } from "../store/reducer/combatList.reducer";



const Description = ({ name, decription }:
  { name: string, decription: string }) => {
  return (
    <p>{name}: <span className="font-medium uppercase text-md">{decription}</span> </p>
  )
}

const PokemonDetail = () => {
  const dispatch = useAppDispatch()
  const { combatList } = useAppSelector((state) => state.combatPokemons)
  const { id } = useParams()

  const { loading, pokemon, error } = useAppSelector((state) => state.pokemon)

  useEffect(() => {
    if (!id) return;
    dispatch(getPokemonDetail(id))
  }, [dispatch, id])

  const isPokemonInCombatList = useMemo(() => {
    if (combatList.length === 0 || !id) return false;
    return combatList.some((item: PokemonCombat) => String(item?.id) === String(pokemon.id));
  }, [combatList, pokemon]);


  const actionToCombat = () => {
    if (isPokemonInCombatList && pokemon.id) {
      dispatch(deletePokemonFromCombat(pokemon.id))
      return;
    }
    dispatch(addPokemonToCombat({
      id: pokemon?.id,
      name: pokemon?.name,
      image: pokemon?.sprites?.other?.dream_world?.front_default
    }))
  }

  const pokemonType = pokemon?.types?.map((type: {
    type: { name: string }
  }) => type.type.name).join(', ') || ''


  const statsDetails = pokemon?.stats?.map((stat: {
    base_stat: number
  }, index: number) => {
    const data = {
      baseStat: stat.base_stat,
      statName: statsName[index]
    }
    return data;
  })

  if (loading) return <PokemonDetailSkeleton />
  if (error) return <NotFoundPokemon error={error} />
  return (
    <>

      <div className="px-4 py-5 shadow-lg bg-base-200">
        <div className="flex justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-secondary"
            data-cy="back-link"
          >
            <ChevronLeftIcon className="size-3" />
            <span> Volver</span>
          </Link>
          <button className="btn btn-outline btn-secondary"
            onClick={actionToCombat}
            data-cy="combat-button"
          >
            <PlusIcon className=' size-5' />
            {isPokemonInCombatList ? 'Eliminar de la lista' : 'Agregar a la lista'}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt={pokemon.name} className="w-[200px] h-[200px] xl:w-auto xl:h-auto" />
        </div>
        <h1
          cy-data="pokemon-name"
          className="mt-5 text-3xl font-bold text-primary">{pokemon?.name}</h1>
        <div className="flex justify-between mt-4">
          <Description name="Número" decription={pokemon?.id?.toString() || ''} />
          <Description name="Altura" decription={pokemon?.height?.toString() || ''} />
          <Description name="Tipo" decription={pokemonType} />
        </div>
        <h1 className="mt-2 mb-2 text-lg font-medium ">Estadísticas base</h1>
        <div className="grid grid-cols-3 xl:grid-cols-5">
          {statsDetails?.map((stat, index) => (
            <StatsDetail
              key={index}
              baseStat={stat.baseStat}
              statName={stat.statName}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default PokemonDetail