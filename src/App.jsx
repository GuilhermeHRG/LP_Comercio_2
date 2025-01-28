import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.css';
import Home from './pages/home';
import Login from './components/login/login';
import AdminPanel from './components/adminPanel/AdminPanel';
import PrivateRoute from './routes/privateRoute';

const App = () => (
  <Router>
    <Routes>
      {/* Página inicial */}
      <Route path="/" element={<Home />} />

      {/* Rota para Login */}
      <Route path="/login" element={<Login />} />

      {/* Rota privada para Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        }
      />

      {/* Rota para páginas não encontradas */}
      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
    </Routes>
  </Router>
);

export default App;
