import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/styles.css';
import ListRoutes from './routes/listroutes';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
       <RouterProvider router={ListRoutes} />
  </React.StrictMode>
);
