import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthForm.css";
import "../../src/App.css";
function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Simulando Login bem-sucedido...");
    onLoginSuccess();
    navigate("/board");
  };
  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="password" required />
        <button type="submit">Entrar</button>
      </form>
      <p className="register-question">
        Não tem uma conta? <Link className="register-icon" to="/register">Registre-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
