import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./AuthForm.css";
import "../../src/App.css";

function LoginPage({ onLoginSuccess }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      onLoginSuccess();

      navigate("/board");
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    }
  };
  return (
    <div className="auth-container login-container">
      <h2 className="auth-title login-title">Login</h2>
      <form onSubmit={handleLogin}>
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
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p className="auth-error">{error}</p>}
      <p className="auth-question register-question">
        Não tem uma conta? <Link className="register-icon" to="/register">Registre-se</Link>
      </p>
    </div>
  );
}

export default LoginPage;
