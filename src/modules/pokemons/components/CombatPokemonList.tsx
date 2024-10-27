import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { EyeIcon, TrashIcon } from '@heroicons/react/24/solid';
import { PokemonCombat, useCombatPokemonContext } from '../contenxt/AddPokemonContext';

const CombatPokemonList = () => {
  const { combatList, deletePokemon } = useCombatPokemonContext();
  const [hoveredPokemon, setHoveredPokemon] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (combatList.length === 0) {
      setHoveredPokemon(null)
    }
  }, [combatList])


  const getPokemonDetail = (name: string) => {
    navigate(`/pokemons/${name}`);

  }

  return (
    <div className='h-full overflow-auto scrollbar-hidden'>
      <h2 className='mb-4 text-3xl font-bold text-center text-primary'>Listos para el combate 🤺</h2>
      <div className="flex flex-wrap justify-center gap-2 ">
        {
          combatList?.length === 0 ?
            <p className='text-center text-gray-500 align-middle text-md'>Lista vacia, no hay ningun pokemon listo.</p>
            :
            combatList.map((pokemon: PokemonCombat) => (
              <div
                key={pokemon.id}
                data-cy="combat-card"
                className="relative flex justify-center flex-col items-center hover:border-none p-4 bg-base-300  shadow-lg border border-orange-100 rounded-xl w-[190px] h-[180px] group"
                onMouseEnter={() => setHoveredPokemon(pokemon.id)}
                onMouseLeave={() => setHoveredPokemon(null)}
              >
                <div className={`absolute right-0 flex items-center justify-center top-0
                left-0 bottom-0 bg-gray-800 bg-opacity-90 rounded-xl
                cursor-pointer transition-opacity duration-200
                ${hoveredPokemon === pokemon.id ? 'block' : 'hidden'}`}>
                  <div className='flex flex-col items-center justify-center h-full gap-5'>
                    <p className='text-sm font-bold text-white'
                      onClick={() => getPokemonDetail(pokemon.name)}
                    >{pokemon.name.toUpperCase()}</p>
                    <div className='flex gap-1'>
                      <button
                        data-cy="delete-pokemon"
                        className='p-1 transition-all duration-300 rounded-full shadow-xl hover:bg-secondary' onClick={() => deletePokemon(pokemon.id)}>
                        <TrashIcon className='text-white size-4' />
                      </button>
                      {/* suggest go to detail */}
                      <Link
                        data-cy="detail-link"
                        to={`/pokemons/${pokemon.name}`} className='p-1 transition-all duration-300 rounded-full shadow-xl hover:bg-secondary '>
                        <EyeIcon className='text-white size-4' />
                      </Link>
                    </div>

                  </div>
                </div>
                <img src={pokemon.image} alt={pokemon.name}
                  className='object-contain w-32 h-32 '
                />
              </div>
            ))}
      </div>
    </div>
  )
}

export default CombatPokemonList