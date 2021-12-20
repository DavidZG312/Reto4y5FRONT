import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Usuarios from './pages/Usuarios'
import Productos from './pages/Productos'
import Ordenes from './pages/Ordenes'

import './styles/global.css';

// Notification
import { SnackbarProvider } from 'notistack';

// Store
import store from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        preventDuplicate
      >
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/ordenes" element={<Ordenes />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </Provider >

  );
}

export default App;
