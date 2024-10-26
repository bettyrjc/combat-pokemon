/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { getPokemonDetail } from "../store/pokemon.action";
import { PokemonCombat, useCombatPokemonContext } from "../contenxt/AddPokemonContext";
import NotFoundPokemon from "../components/NotFoundPokemon";
import PokemonDetailSkeleton from '../components/PokemonDetailSkeleton';

interface StatsProps {
  baseStat: number;
  statName: string;
}
const Stats = ({ baseStat, statName }: StatsProps) => {
  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <div className="bg-blue-50 radial-progress text-secondary" style={{ "--value": baseStat } as React.CSSProperties} role="progressbar">
        {baseStat} %
      </div>
      <p className="mt-2 text-sm text-center text-secondary">{statName}</p>
    </div>
  )
}
const Description = ({ name, decription }:
  { name: string, decription: string }) => {
  return (
    <p>{name}: <span className="font-medium uppercase text-md">{decription}</span> </p>
  )
}

const PokemonDetail = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { addPokemon, combatList, deletePokemon } = useCombatPokemonContext();

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
      deletePokemon(pokemon.id.toString())
      return;
    }
    addPokemon({
      id: pokemon?.id,
      name: pokemon?.name,
      image: pokemon?.sprites?.other?.dream_world?.front_default
    })
  }
  if (loading) return <PokemonDetailSkeleton />
  if (error) return <NotFoundPokemon error={error} />
  return (
    <>

      <div className="px-4 py-5 shadow-lg bg-base-200">
        <div className="flex justify-between mb-6">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-secondary">
            <ChevronLeftIcon className="size-3" />
            <span> Volver</span>
          </Link>
          <button className="btn btn-outline btn-secondary"
            onClick={actionToCombat}
          >
            <PlusIcon className=' size-5' />
            {isPokemonInCombatList ? 'Eliminar de la lista' : 'Agregar a la lista'}
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img src={pokemon?.sprites?.other?.dream_world?.front_default} alt={'pokemon'} />
        </div>
        <h1 className="mt-10 text-3xl font-bold text-primary">{pokemon?.name}</h1>
        <div className="flex justify-between mt-4">
          <Description name="Número" decription={pokemon?.id?.toString() || ''} />
          <Description name="Altura" decription={pokemon?.height?.toString() || ''} />
          <Description name="Tipo" decription={pokemon?.types?.[0]?.type?.name || ''} />
        </div>
        <h1 className="mt-3 mb-4 text-lg font-medium ">Estadísticas base</h1>
        <div className="grid grid-cols-3 xl:grid-cols-5">
          <Stats baseStat={pokemon?.stats?.[1]?.base_stat || 0} statName="Ataque" />
          <Stats baseStat={pokemon?.stats?.[2]?.base_stat || 0} statName="Defensa" />
          <Stats baseStat={pokemon?.stats?.[3]?.base_stat || 0} statName="Ataque especial" />
          <Stats baseStat={pokemon?.stats?.[4]?.base_stat || 0} statName="Defensa especial" />
          <Stats baseStat={pokemon?.stats?.[5]?.base_stat || 0} statName="Velocidad" />
        </div>


      </div>
    </>
  )
}

export default PokemonDetail