import React from "react";
import "./Button.css";

function Button({onClick}) {
  return (
    <div>
      <button onClick={onClick} id="btn">
        Adicionar
      </button>
    </div>
  );
}

export default Button;
