import React, {createContext, useContext, useState} from 'react';


const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  const setLoginToken = (token) => {
    setAuthToken(token)
  }

  const removeLoginToken = () => {
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{ authToken, setLoginToken, removeLoginToken }}>
      {children}
    </AuthContext.Provider>
  );
};