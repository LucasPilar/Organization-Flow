import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Simulando Login bem-sucedido...");
    onLoginSuccess();
    navigate("/board");
  };
  return (
    <div>
      <h2>Página de Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="password" required />
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Registre-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
