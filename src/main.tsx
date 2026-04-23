import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ToastProvider } from './components/common/Toast/ToastContext'
import { SignupProvider } from './context/SignupContext'
import './assets/css/style.css'

import { BrowserRouter } from 'react-router-dom'
import { setupDynamicImportErrorHandlers } from './utils/errorHandlers'

// Initialize global error handlers to detect and recover from chunk load failures
setupDynamicImportErrorHandlers();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <SignupProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </SignupProvider>
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
