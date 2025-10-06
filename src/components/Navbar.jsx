import React from "react";
import "./Navbar.css";
import NavItem from "./NavItem";

const Navbar = ({ onAddCardClick }) => {
  return (
    <nav className="navbar">
      <NavItem text="Home" link="./app.jsx" />
      <NavItem text="Adicionar Card" onClick={onAddCardClick} />
    </nav>
  );
};

export default Navbar;
