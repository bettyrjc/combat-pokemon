import { Routes, Route, Navigate } from 'react-router-dom';
import PokemonList from './modules/pokemons/views/index';
import { Toaster } from 'react-hot-toast';
import PokemonDetail from './modules/pokemons/views/[id]';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemons/:id" element={<PokemonDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;