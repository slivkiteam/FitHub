import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);
reactRoot.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
