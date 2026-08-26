import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App.tsx';
import './index.css';

// Inicializar Google Analytics
ReactGA.initialize('G-28GD66ZHCV');

// Registrar la visita a la página
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);