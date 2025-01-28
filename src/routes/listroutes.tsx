import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../components/login/login';
import AdminPanel from '../components/adminPanel/AdminPanel';
import PrivateRoute from './privateRoute'; // Importação do PrivateRoute
import Home from '../pages/home';

const ListRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />, 
  },
  {
    path: '/login',
    element: <Login />, // Página de Login
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminPanel />
      </PrivateRoute>
    ), // Rota privada para o painel admin
  },
  {
    path: '*',
    element: <h1>404 - Página Não Encontrada</h1>, // Rota para erros
  },
]);

export default ListRoutes;
