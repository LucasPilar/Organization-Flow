// Em src/components/Navbar.jsx

import React from "react";
import "./Navbar.css"; // Importa o CSS corrigido
import { LogOut } from 'lucide-react';

function Navbar({ onAddCardClick, onLogout }) {
  return (
    <nav className="navbar">
      {/* Seção da Esquerda: Título */}
      <div className="navbar-left">
        <h1>Organization Flow</h1>
      </div>

      {/* Seção Central: Botão de Adicionar */}
      <div className="navbar-center">
        <button className="navbar-button" onClick={onAddCardClick}>
          Adicionar Card
        </button>
      </div>

      {/* Seção da Direita: Botão de Sair */}
      <div className="navbar-right">
        <LogOut 
          className="logout-icon" 
          onClick={onLogout} 
          size={24} 
        />
      </div>
    </nav>
  );
}

export default Navbar;
