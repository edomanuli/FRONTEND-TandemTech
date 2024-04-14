import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const navigation = useNavigate();

  const handleuserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmition = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://localhost:5001/api/user/register", userInfo);
      navigation("/login");
    } catch (error) {
      console.error(`Registration failed: ${error.response.data}`);
    }
  };

  return (
    <>
      <Header />
      <h1>Register</h1>
      <div>
        <form onSubmit={handleSubmition}>
          <div>
            <label>
              {" "}
              First Name
              <input
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div>
            <label>
              {" "}
              Last Name
              <input
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div>
            <label>
              {" "}
              Username
              <input
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div>
            <label>Password
              <input
                type="text"
                name="password"
                value={userInfo.password}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
