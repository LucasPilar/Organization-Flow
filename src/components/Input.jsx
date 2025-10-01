import React from "react";
import "./Input.css";

function Input({ value, onChange }) {
  return (
    <input
      type="text"
      id="input"
      placeholder="Adicione uma tarefa"
      autocomplete="false"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    ></input>
  );
}
export default Input;
