import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
  const handleRegister = (e) => {
    e.preventDefault();

    console.log("Enviando dados de registro para o back-end...");
  };

  return (
    <div>
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="password" required />
        <button type="submit">Registrar</button>
      </form>
      <p>
        Já tem uma conta? <Link to="/login">Faça Login</Link>
      </p>
    </div>
  );
}
export default RegisterPage;
