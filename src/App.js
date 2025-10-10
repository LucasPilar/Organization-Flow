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
  // ATENÇÃO: Para desenvolvimento, 'true' permite acesso direto à BoardPage.
  // Mude para 'false' para testar o fluxo de login completo ou para produção.
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Função que será passada para a LoginPage para atualizar o estado após o login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Função que será passada para a BoardPage (e depois para a Navbar) para fazer logout
  const handleLogout = () => {
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
