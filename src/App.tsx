import PokemonList from './modules/pokemons/views/index';
// {/* layout */}
// {/* header */}
// {/* main */}
// {/* footer */}

// {/* redux configurations ✅ */}
// {/* api ✅  */}
// {/* routes */}
// {/* daysi ui and tailwind configurations ✅ */}
// {/* hooks ✅  */}
// {/* utils ✅ */}
function App() {

  return (
    <div className="grid h-screen grid-cols-3 overflow-y-hidden bg-base-200">
      <PokemonList />
      {/* another section WIP */}
      <div className="col-span-1 p-10 bg-purple-500">
        Quien esta listo para el combate
      </div>
    </div>
  )
}

export default App
