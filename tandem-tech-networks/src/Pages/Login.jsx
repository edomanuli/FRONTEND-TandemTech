import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Services/useAuth";
import Header from "./Header";
import Footer from "./Footer";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const { setLoginToken } = useAuth();
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:5001/api/user/login", { username, password });
      setLoginToken(response.data.token);
      navigation("/home");
    } catch (error) {
      console.error(`Login failed: ${error}`);
    }
  };

  return (
    <div>
      <Header />
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label> Username
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
        </div>
        
        <div>
          <label> Password
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <Footer />
    </div>
  );
}


export default Login;