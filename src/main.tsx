import './index.css';
import App from '@/components/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from 'react-error-boundary';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './components/theme-provider';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorFallBack, { errorResetHandler } from './components/ErrorFallback';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary onReset={errorResetHandler} fallbackRender={ErrorFallBack}>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <TooltipProvider>
            <ThemeProvider>
              <section className="mx-auto 2xl:max-w-[1536px]">
                <Toaster />
                <App />
              </section>
            </ThemeProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
