import React from 'react';

const NavItem = ({ label, href }) => {
  return (
    <li className="nav-item">
      <a href={href}>{label}</a>
    </li>
  );
};

export default NavItem;