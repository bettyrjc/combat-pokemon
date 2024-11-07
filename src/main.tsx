import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import Layout from './modules/shared/layout/index.tsx'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <Router>
          <Layout>
            <App />
          </Layout>
        </Router>
    </Provider>
  </StrictMode>,
)
