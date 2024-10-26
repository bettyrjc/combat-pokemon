import { TrashIcon } from '@heroicons/react/24/solid';
import CircleButton from '../../shared/buttons/CircleButton';
import { PokemonCombat, useCombatPokemonContext } from '../contenxt/AddPokemonContext';
import { useEffect, useState } from 'react';

const CombatPokemonList = () => {
  const { combatList, deletePokemon } = useCombatPokemonContext();
  const [hoveredPokemon, setHoveredPokemon] = useState<string | null>(null);
  console.log('combatList', combatList)

  useEffect(() => {
    if (combatList.length === 0) {
      setHoveredPokemon(null)
    }
  }, [combatList])

  return (
    <div className=''>
      <h2 className='mb-4 text-3xl font-bold text-center text-primary'>Listos para el combate 🤺</h2>
      <div className="flex flex-wrap justify-center gap-2 ">
        {
          combatList.length === 0 ?
            <p className='text-center text-gray-500 align-middle text-md'>Lista vacia, no hay ningun pokemon listo.</p>
            :
            combatList.map((pokemon: PokemonCombat) => (
              <div
                key={pokemon.id}
                className="relative flex justify-center flex-col items-center p-4 bg-base-100 rounded-xl w-[120px] h-[140px] group"
                onMouseEnter={() => setHoveredPokemon(pokemon.id)}
                onMouseLeave={() => setHoveredPokemon(null)}
              >
                <div className={`absolute right-0 flex items-center justify-center top-0
                left-0 bottom-0 bg-gray-800 bg-opacity-90 rounded-xl
                cursor-pointer transition-opacity duration-200
                ${hoveredPokemon === pokemon.id ? 'block' : 'hidden'}`}>
                  <div className='flex flex-col items-center justify-center h-full gap-5'>
                    <p className='text-sm font-bold text-white'>{pokemon.name.toUpperCase()}</p>
                    <CircleButton
                      icon={<TrashIcon className='text-white size-4' />}
                      onClick={() => deletePokemon(pokemon.id)}
                    />
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