import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import PusherProvider from './provider/PusherProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PusherProvider>
      <App />
    </PusherProvider>
  </StrictMode>,
)
