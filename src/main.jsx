import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ConsentProvider } from './consent/ConsentContext.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ConsentProvider>
          <App />
        </ConsentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);