/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";


export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    const saveToken = localStorage.getItem("token");
    return saveToken ? saveToken : null;
  });

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("token", authToken);
    } else {
      localStorage.removeItem("token");
    }
  }, [authToken]);

  const setLoginToken = (token) => {
    setAuthToken(token);
  };

  const removeLoginToken = () => {
    setAuthToken(null);
  };

  const isLoggedIn = () => {
    return authToken !== null;
  };

  return (
    <AuthContext.Provider
      value={{ authToken, setLoginToken, removeLoginToken, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
