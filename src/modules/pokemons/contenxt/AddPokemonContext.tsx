/* eslint-disable react-refresh/only-export-components */

import { createContext, FC, ReactNode, useContext, useState } from "react";
import { extractUrlId } from "../../shared/common";
import toast from "react-hot-toast";
import { PokemonDetail } from "../interfaces/Pokemons.interface";

type PokemonContextProps = {
  combatList: PokemonCombat[];
  setCombatList: React.Dispatch<React.SetStateAction<PokemonCombat[]>>;
  addPokemon: (data: PokemonDetail) => void;
  imagesList: ImageCombat[];
  setImagesList: React.Dispatch<React.SetStateAction<ImageCombat[]>>;
  deletePokemon: (id: string) => void;
};

export type PokemonCombat = {
  id: string;
  name: string;
  image?: string;
}
export type ImageCombat = {
  id: string;
  image?: string;
}

const CombatPokemonContext = createContext<PokemonContextProps>({
  combatList: [],
  setCombatList: () => { },
  addPokemon: () => { },
  imagesList: [],
  setImagesList: () => { },
  deletePokemon: () => { }
});

export function useCombatPokemonContext() {
  const context = useContext(CombatPokemonContext);

  if (!context) {
    throw Error("error in add combat pokemon context");
  }

  return {
    combatList: context.combatList,
    setCombatList: context.setCombatList,
    addPokemon: context.addPokemon,
    imagesList: context.imagesList,
    setImagesList: context.setImagesList,
    deletePokemon: context.deletePokemon
  };
}

export const CombatPokemonProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [combatList, setCombatList] = useState<PokemonCombat[]>([])
  const [imagesList, setImagesList] = useState<ImageCombat[]>([])

  const addPokemon = (data: PokemonDetail) => {
    const id = data?.id ? String(data.id) : extractUrlId(data.url || '')
    const normalizeId = (id: string | number): string => String(id).trim();
    const pokemonImage = data?.image ? data : imagesList.find((item: ImageCombat) => normalizeId(item.id) === normalizeId(id));
    const isPokemon = combatList.some((item: PokemonCombat) => item.id === id)
    if (isPokemon ){
      toast('Este pokemon ya esta en la lista 🤺', {
        icon: 'ℹ️'
      });
      return;
    }
    if (combatList.length >= 6) {
      toast.error('No puedes agregar mas de 6 pokemones');
      return;
    }
    const newPokemon: PokemonCombat = {
      id,
      name: data.name,
      image: pokemonImage?.image
    };
    setCombatList((prev: PokemonCombat[]) => [...prev, newPokemon]);
  }

  const deletePokemon = (id: string) => {
    console.log('delete', typeof id)
    const deletedPokemon = combatList.filter((item: PokemonCombat) => item.id !== id);
    setCombatList(deletedPokemon);
  }
  return (
    <CombatPokemonContext.Provider
      value={{
        combatList,
        setCombatList,
        addPokemon,
        imagesList,
        setImagesList,
        deletePokemon
      }}
    >
      {children}
    </CombatPokemonContext.Provider>
  );
};
