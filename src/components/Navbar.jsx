import React from 'react';
import './Navbar.css';
import NavItem from './NavItem';

const Navbar = ({ logo, items }) => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        {items.map((item, index) => (
          <NavItem key={index} label={item.label} href={item.href} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;