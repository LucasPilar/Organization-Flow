import React, { useState } from "react";
import Card from "./components/Card"; // Ajuste o caminho conforme a estrutura do seu projeto
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [cardList, setCardList] = useState([]);

  const AddCard = () => {
    const newCard = {
      id: Date.now(),
    };
    setCardList((prevCardList) => [...prevCardList, newCard]);
    console.log("Novo Card adicionado!");
  };

  const deleteCard = (idToDelete) => {
    setCardList((prevCardList) =>
      prevCardList.filter((card) => card.id !== idToDelete)
    );
    console.log(`Card com id ${idToDelete} removido!`);
  };

  return (
    <div className="App">
      <Navbar onAddCardClick={AddCard} />
      <main className="card-container">
        {cardList.map((card) => (
          <Card key={card.id} onDelete={() => deleteCard(card.id)} />
        ))}
      </main>
    </div>
  );
}

export default App;
