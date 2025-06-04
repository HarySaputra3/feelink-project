import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/ToastContainer";
import { LoadingProvider } from './contexts/LoadingContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <LoadingProvider>
        <ToastProvider>
          <BrowserRouter>
              <AppRoutes />
          </BrowserRouter>
          <ToastContainer />
        </ToastProvider>
      </LoadingProvider>
    </QueryClientProvider>
  )
}

export default App
