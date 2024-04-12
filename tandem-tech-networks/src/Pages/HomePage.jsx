import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Services/AuthService";

function Home() {
  const { removeLoginToken, isLoggedIn } = useAuth();

  const handleLogout = () => {
    removeLoginToken();
  };
  
  
  return (
    <>
      <h1>Welcome to TandemTech Networks</h1>
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
              {/* <li>
                <NavLink to="/profile">Profile</NavLink>
              </li> */}
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
}

export default Home;
