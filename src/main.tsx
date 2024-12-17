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
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary onReset={errorResetHandler} fallbackRender={ErrorFallBack}>
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <TooltipProvider>
            <ThemeProvider>
              <Toaster />
              <section className='mx-auto 2xl:max-w-[1536px]'>
                <App />
              </section>
            </ThemeProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
