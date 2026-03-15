import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App/index.css'
import App from './App/App'
import { store } from './App/App.store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
