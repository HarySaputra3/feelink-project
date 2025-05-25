import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ToastContainer";

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <ToastContainer />
    </ToastProvider>
  )
}

export default App
