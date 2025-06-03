import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/ToastContainer";
import { LoadingProvider } from './contexts/LoadingContext';

function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
        <ToastContainer />
      </ToastProvider>
    </LoadingProvider>
  )
}

export default App
