import { ReactNode } from 'react';
import CombatPokemonList from '../components/CombatPokemonList';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid h-screen grid-cols-3 overflow-y-hidden bg-base-200">
      <div className="w-full col-span-2 px-5">
        {children}
      </div>
    <div className="flex flex-col items-center h-full col-span-1 p-10 overflow-scroll overflow-y-auto bg-orange-100">
      <CombatPokemonList />
    </div>
  </div>
  )
}

export default Layout