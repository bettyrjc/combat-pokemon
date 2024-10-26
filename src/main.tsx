import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { CombatPokemonProvider } from './modules/pokemons/contenxt/AddPokemonContext.tsx'
import Layout from './modules/pokemons/layout/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <CombatPokemonProvider>
        <Layout>
          <App />
        </Layout>
      </CombatPokemonProvider>
    </Provider>
  </StrictMode>,
)
