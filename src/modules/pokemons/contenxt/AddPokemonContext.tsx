/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createContext, FC, ReactNode, useContext, useState } from "react";
import { extractUrlId } from "../../shared/common";
import toast from "react-hot-toast";
type PokemonContextProps = {
  combatList: any;
  setCombatList: (value: any) => void;
  addPokemon: (data: any) => void;
  imagesList: any;
  setImagesList: (value: any) => void;
  deletePokemon: (id: string) => void;
};

export type PokemonCombat = {
  id: string;
  name: string;
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
  const [combatList, setCombatList] = useState<any>([])
  const [imagesList, setImagesList] = useState<any>([])

  const addPokemon = (data: any) => {
    const id = extractUrlId(data.url)
    const isPokemon = combatList.some((item: any) => item.id === id)
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
    const normalizeId = (id: string | number): string => String(id).trim();
    const pokemonImage = imagesList.find((item: any) => normalizeId(item.id) === normalizeId(id));
    const newPokemon: PokemonCombat = {
      id,
      name: data.name,
      image: pokemonImage?.image
    };
    setCombatList((prev: any) => [...prev, newPokemon]);
  }

  const deletePokemon = (id: string) => {
    const deletedPokemon = combatList.filter((item: any) => item.id !== id);
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
