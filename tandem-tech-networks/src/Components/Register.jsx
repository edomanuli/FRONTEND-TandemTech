import React, { useState } from "react";
import { userRegistration } from "../Services/AuthService";

function Register() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await userRegistration(userInfo);
      console.log(data);
      // later i will redirect it to login page. Login not ready yet
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <div>
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
          />
        </div>

        <label>Last Name</label>
        <div>
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
          />
        </div>

        <label>Username</label>
        <div>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
          />
        </div>

        <label>Email</label>
        <div>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          />
        </div>

        <label>Password</label>
        <div>
          <input
            type="text"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </>
  );
}

export default Register;
