import React from 'react';
import Input from './Input';
import './List.css'



function Card() {
  return (

    <div className="container">
      <div className="lista-tarefas">
        <h2>Lista de Tarefas </h2>
        <div class="linha">
          <Input />
          <button id="btn">Adicionar</button>
        </div>
        <ul id="lista">

        </ul>
      </div>
    </div>

  );
}

export default Card;