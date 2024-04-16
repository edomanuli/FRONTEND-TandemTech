import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Services/AuthService";

const Header = () => {
  const { removeLoginToken, isLoggedIn } = useAuth();

  const handleLogout = () => {
    removeLoginToken();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-3 pt-3 pb-3 fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/home">
            Tandem-Tech Networks
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item px-3">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="nav-item px-2">
                <NavLink className="nav-link" to="/allplans">
                  Our Plans
                </NavLink>
              </li>
              {isLoggedIn() ? (
                <>
                  <li className="nav-item px-2">
                    <NavLink className="nav-link" to="/account">
                      Account
                    </NavLink>
                  </li>
                  <button
                    className="btn btn-outline-secondary mx-2"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
