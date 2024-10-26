import PokemonList from './modules/pokemons/views/index';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <PokemonList />
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          duration: 3000,
        }}
      />
    </>
  )
}

export default App
