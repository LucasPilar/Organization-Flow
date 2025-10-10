import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthForm.css";
import "../../src/App.css";

function RegisterPage() {
  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Enviando dados de registro para o back-end...");
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="password" required />
        <button type="submit">Registrar</button>
      </form>
      <p className="register-question">
        Já tem uma conta? <Link className="login-icon" to="/login">Faça Login</Link>
      </p>
    </div>
  );
}
export default RegisterPage;
