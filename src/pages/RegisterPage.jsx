import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import "../../src/App.css";

function RegisterPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/register", { email, password });
      setSuccess(res.data.message + "Redirecionando para o login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao registrar.");
    }
  };

  return (
    <div className=" register-container">
      <h2 className=" register-title">Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={onChange}
          minLength="6"
          required
        />
        <button type="submit">Registrar</button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
      <p className="register-question">
        Já tem uma conta?{" "}
        <Link className="login-icon" to="/login">
          Faça Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
