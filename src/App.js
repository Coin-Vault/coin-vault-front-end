import './App.css';

import { Home } from './Home';
import { Trades } from './Trades';
import { Portfolio } from './Portfolio';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

import LoginButton from './Auth0-components/loginButton';
import LogoutButton from './Auth0-components/logoutButton';

function App() {
  return (
    <BrowserRouter>
      <Auth0Provider
          domain="coinvault.eu.auth0.com"
          clientId="VwegpzVVMEGPsut3XvqPqM91weVAxLrr"
          authorizationParams={{
            redirect_uri: window.location.origin
          }}
      >
        <div className="App container">
          <h3 className="d-flex justify-content-center m-3">
            CoinVault
          </h3>
          <nav className="navbar navbar-expand-sm bg-light navbar-dark">
            <ul className="navbar-nav">  
                <li className="nav-item m-1">
                  <LoginButton/>
                </li>
                <li className="nav-item m-1">
                  <LogoutButton/>
                </li>
                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/home">
                    Profile
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/trades">
                    Trades
                  </NavLink>
                </li>
                <li className="nav-item m-1">
                  <NavLink className="btn btn-light btn-outline-primary" to="/portfolio">
                    Portfolio
                  </NavLink>
                </li>
            </ul>
          </nav>

          <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/trades" element={<Trades />} />
              <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
        </div>
      </Auth0Provider>
    </BrowserRouter>
  );
}
export default App;