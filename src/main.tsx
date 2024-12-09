import './index.css';
import App from '@/components/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './components/theme-provider';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallBack, { errorResetHandler } from './components/ErrorFallback';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary onReset={errorResetHandler} fallbackRender={ErrorFallBack}>
      <BrowserRouter>
        <TooltipProvider>
          <ThemeProvider>
            <Toaster />
            <App />
          </ThemeProvider>
        </TooltipProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
