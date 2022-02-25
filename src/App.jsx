import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/Auth';
import './Global.css';
import { Router } from './routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <div className="container">
    <ToastContainer autoClose={3000} theme="colored" />
    <Router />
    </div>
      </ AuthProvider>
    </BrowserRouter>

  );
}

export default App;
