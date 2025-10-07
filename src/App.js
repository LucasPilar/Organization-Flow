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

// Função para gerar IDs únicos

const generateUniqueId = (prefix) => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

function App() {
  // O estado agora inclui as tarefas de cada card
  const [cardList, setCardList] = useState(() => {
    const savedCards = localStorage.getItem("cardList");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  useEffect(() => {
    localStorage.setItem("cardList", JSON.stringify(cardList));
  }, [cardList]);

  const addCard = () => {
    const newCard = {
       id: generateUniqueId("card"), // ID único e mais descritivo
      title: "Nova Lista",
      tasks: [], // Cada card agora tem seu próprio array de tarefas
    };
    setCardList((prev) => [...prev, newCard]);
  };

  const deleteCard = (cardId) => {
    setCardList((prev) => prev.filter((card) => card.id !== cardId));
  };

  const updateCardTitle = (cardId, newTitle) => {
    setCardList((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    );
  };

  // --- LÓGICA DAS TAREFAS (MOVIDA PARA CÁ) ---
  const addTask = (cardId, taskText) => {
    const newTask = {
     id: generateUniqueId("task"), 
      text: taskText,
      isChecked: false,
    };
    setCardList((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, tasks: [...card.tasks, newTask] } : card
      )
    );
  };

  const deleteTask = (cardId, taskId) => {
    setCardList((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            tasks: card.tasks.filter((task) => task.id !== taskId),
          };
        }
        return card;
      })
    );
  };

  const toggleTask = (cardId, taskId) => {
    setCardList((prev) =>
      prev.map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            tasks: card.tasks.map((task) =>
              task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
            ),
          };
        }
        return card;
      })
    );
  };

  // --- LÓGICA DE ARRASTAR E SOLTAR ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // CORREÇÃO: Renomeado para handleDragEnd para clareza
  function handleDragEnd(event) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCardList((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="App">
        <Navbar onAddCardClick={addCard} />
        <main className="card-container">
          <SortableContext items={cardList} strategy={rectSortingStrategy}>
            {cardList.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                title={card.title}
                tasks={card.tasks} // Passa as tarefas para o componente Card
                onDelete={() => deleteCard(card.id)}
                onUpdateTitle={updateCardTitle}
                onAddTask={addTask}
                onDeleteTask={deleteTask}
                onToggleTask={toggleTask}
              />
            ))}
          </SortableContext>
        </main>
      </div>
    </DndContext>
  );
}

export default App;
