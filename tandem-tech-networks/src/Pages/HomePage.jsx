import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Services/AuthService";

function Home() {
  const { removeLoginToken } = useAuth();

  const handleLogout = () => {
    removeLoginToken();
  };
  
  
  return (
    <>
      <h1>Welcome to TandemTech Networks</h1>
      <nav>
        <li><NavLink to="/home">Home</NavLink></li>
        <li><button onClick={handleLogout}>Log Out</button></li>
      </nav>
    </>
  );
}

export default Home;
