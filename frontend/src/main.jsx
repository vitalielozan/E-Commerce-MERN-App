import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import './i18n.js'
import App from './App.jsx'
import AppProviders from './providers/AppProviders.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HeroUIProvider>
      <AppProviders>
        <App />
      </AppProviders>
    </HeroUIProvider>
  </React.StrictMode>
)
