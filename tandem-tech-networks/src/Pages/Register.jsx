import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

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
      <h1 className="d-flex justify-content-center">Register</h1>
      <div className="">
        <form
          className="row g-3 d-flex justify-content-center"
          onSubmit={handleSubmition}
        >
          <div className="col-12">
            <label className="form-label">
              {" "}
              First Name
              <input
                className="form-control"
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div className="col-12">
            <label className="form-label">
              {" "}
              Last Name
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div className="col-12">
            <label className="form-label">
              {" "}
              Username
              <input
                className="form-control"
                type="text"
                name="username"
                value={userInfo.username}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div className="col-12">
            <label className="form-label">
              Email
              <input
                className="form-control"
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div className="col-12">
            <label className="form-label">
              Password
              <input
                className="form-control"
                type="text"
                name="password"
                value={userInfo.password}
                onChange={handleuserInfo}
              />
            </label>
          </div>

          <div>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Register;
