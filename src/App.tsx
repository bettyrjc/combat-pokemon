import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './modules/pokemons/views/index';
import { Toaster } from 'react-hot-toast';
import PokemonDetail from './modules/pokemons/views/[id]';

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemons/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );
}

export default App;