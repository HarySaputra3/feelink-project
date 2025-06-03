import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastProvider } from "./contexts/ToastContext";
import ToastContainer from "./components/ToastContainer";
import { LoadingProvider } from './contexts/LoadingContext';
import { ProfileProvider } from './contexts/ProfileContext';

function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <BrowserRouter>
          <ProfileProvider>
            <AppRoutes />
          </ProfileProvider>
        </BrowserRouter>
        <ToastContainer />
      </ToastProvider>
    </LoadingProvider>
  )
}

export default App
