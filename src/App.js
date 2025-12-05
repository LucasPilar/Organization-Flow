// src/App.js (VERSÃO CORRETA E FINAL)

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Importação das páginas
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BoardPage from "./pages/BoardPage";

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />

        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/board"
          element={
            isAuthenticated ? (
              <BoardPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/board" : "/login"} replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
