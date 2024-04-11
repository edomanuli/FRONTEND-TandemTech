import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/HomePage';
import PrivateRoute from './Components/PrivateRoute';
import { AuthProvider } from './Services/AuthService';

function App() {
  

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute />}>
            <Route path="" element={<Home />} />
          </Route>
          {/* redirect to login if there is no path that matches */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App
