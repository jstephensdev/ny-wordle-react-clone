import React from 'react';
import { Outlet, NavLink, useOutlet } from 'react-router-dom';
import Board from './components/Board';

function App() {
  const outlet = useOutlet()
  return (
    <div>
      <nav className="app-header">
        <NavLink to={`/`}>
          <h2>Ad Free Wordle</h2>
        </NavLink>
        <div>
          <NavLink to={`info`}>
            <ion-icon name="help" size="large" aria-label="Info"></ion-icon>
          </NavLink>
          <NavLink to={`settings`}>
            <ion-icon
              size="large"
              name="settings"
              aria-label="Settings"
            ></ion-icon>
          </NavLink>
          <NavLink to={`stats`}>
            <ion-icon
              size="large"
              name="stats-chart-outline"
              aria-label="Stats"
            ></ion-icon>
          </NavLink>
          <a
            rel="noreferrer"
            href="https://github.com/jstephensdev/ny-wordle-react-clone"
            target="_blank"
          >
            <ion-icon
              size="large"
              aria-label="github"
              name="logo-github"
            ></ion-icon>
          </a>
        </div>
      </nav>
      {outlet ? <Outlet /> : <Board />}
    </div>
  );
}

export default App;
