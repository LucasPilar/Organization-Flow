import React, { useState } from "react";
import Card from "./components/Card"; // Ajuste o caminho conforme a estrutura do seu projeto
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [cardList, setCardList] = useState([]);

  const AddCard = () => {
    const newCard = {
      id: Date.now(),
      title: "Nova Lista",
    };
    setCardList((prevCardList) => [...prevCardList, newCard]);
    console.log("Novo Card adicionado!");
  };

  const updateTitle = (cardId, newTitle) =>{
    setCardList((prevListy) =>
      prevListy.map((card)=>
      card.id === cardId ? {...card, title: newTitle} : card),
    )
  }

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
          <Card 
            key={card.id} 
            onDelete={() => deleteCard(card.id)} 
            onUpdateTitle={updateTitle}

            />
        ))}
      </main>
    </div>
  );
}

export default App;
