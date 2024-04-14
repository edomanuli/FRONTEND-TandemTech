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
      <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/allplans">Our Plans</NavLink>
          </li>
          {isLoggedIn() ? (
            <>
              <li>
                <NavLink to="/account">Account</NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Header;
