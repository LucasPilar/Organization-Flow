import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import "./App.css";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

function App() {
  // CORREÇÃO 1: Lógica de carregamento.
  const [cardList, setCardList] = useState(() => {
    const savedCards = localStorage.getItem("cardList"); // Pega os dados da chave "cardList"
    if (savedCards) {
      return JSON.parse(savedCards); // Se houver, converte de texto para array
    } else {
      return []; // Senão, começa com um array vazio
    }
  });

  // Este useEffect para salvar.
  useEffect(() => {
    localStorage.setItem("cardList", JSON.stringify(cardList));
  }, [cardList]);

  //ADICIONA CARD NOVO
  const addCard = () => {
    const newCard = {
      id: Date.now(),
      title: "Nova Lista",
    };
    setCardList((prevCardList) => [...prevCardList, newCard]);
  };

  //TÍTULO CUSTOMIZADO
  const updateTitle = (cardId, newTitle) => {
    setCardList((prevList) =>
      prevList.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    );
  };

  //DELETA CARD
  const deleteCard = (idToDelete) => {
    setCardList((prevCardList) =>
      prevCardList.filter((card) => card.id !== idToDelete)
    );
  };

  //ARRASTA E SOLTA
  //Configuração de sensores
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //Função de atualização de ordem
  function handleDragEn(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setCardList((items) => {
        const oldIndex = items.findIndex((item) => item.id == active.id);
        const newIndex = items.findIndex((item) => item.id == over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }



  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEn}
    >
    <div className="App">
      <Navbar onAddCardClick={addCard} />
      <main className="card-container">
      <SortableContext items={cardList} strategy={rectSortingStrategy}>
        {cardList.map((card) => (
          <Card
            // CORREÇÃO 2: Passando TODAS as props necessárias
            key={card.id}
            id={card.id} // Passa o ID para ser usado internamente pelo Card
            initialTitle={card.title} // Passa o TÍTULO do card atual
            onDelete={() => deleteCard(card.id)}
            onUpdateTitle={updateTitle} // Passa a função de atualização correta
          />
        ))}
        </SortableContext>
      </main>
    </div>
    </DndContext>
  );
}

export default App;
