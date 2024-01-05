import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './css/App.css';
import App from './App';
import Board from './components/Board';
import Info from './components/Info';
import Stats from './components/Stats';
import Settings from './components/Settings';

const router = createBrowserRouter([
  {
    path: "/",
    element:  <App />,
    children: [
      {
        path: "/board",
        element:  <Board />,
      },
      {
        path: "/info",
        element:  <Info />,
      },
      {
        path: "/stats",
        element:  <Stats />,
      },
      {
        path: "/settings",
        element:  <Settings />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);