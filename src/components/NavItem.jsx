import React from "react";

function NavItem({ text, link, onClick }) {
  if (onClick) {
    return (
      <button onClick={onClick} className="nav-item">
        {text}
      </button>
    );
  } else {
    return (
      <a href={link} className="nav-item">
        {text}
      </a>
    );
  }
}

export default NavItem;
