// src/pages/BoardPage.jsx (VERSÃO CORRETA)

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Componentes
import Card from "../components/Card"; // Caminho corrigido com ../
import Navbar from "../components/Navbar"; // Caminho corrigido com ../

// Estilos
import "../App.css"; // Supondo que os estilos principais estão aqui

// dnd-kit (biblioteca de arrastar e soltar)
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

// O componente recebe a função 'onLogout' do App.js
function BoardPage({ onLogout }) {
  const [cardList, setCardList] = useState(() => {
    const savedCards = localStorage.getItem("cardList");
    return savedCards ? JSON.parse(savedCards) : [];
  });

  useEffect(() => {
    localStorage.setItem("cardList", JSON.stringify(cardList));
  }, [cardList]);

  // --- Funções de Manipulação dos Cards e Tarefas ---

  const addCard = () => {
    const newCard = {
      id: generateUniqueId("card"),
      title: "Nova Lista",
      tasks: [],
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
      prev.map((card) =>
        card.id === cardId
          ? { ...card, tasks: card.tasks.filter((task) => task.id !== taskId) }
          : card
      )
    );
  };

  const toggleTask = (cardId, taskId) => {
    setCardList((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: card.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, isChecked: !task.isChecked }
                  : task
              ),
            }
          : card
      )
    );
  };

  const updateTaskText = (cardId, taskId, newText) => {
    setCardList((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: card.tasks.map((task) =>
                task.id === taskId ? { ...task, text: newText } : task
              ),
            }
          : card
      )
    );
  };

  // --- Lógica do dnd-kit ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

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
        {/* Passamos a função de adicionar card e a de logout para a Navbar */}
        <Navbar onAddCardClick={addCard} onLogout={onLogout} />
        <main className="card-container">
          <SortableContext items={cardList} strategy={rectSortingStrategy}>
            <AnimatePresence>
              {cardList.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, x: -100 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <Card
                    id={card.id}
                    title={card.title}
                    tasks={card.tasks}
                    onDelete={() => deleteCard(card.id)}
                    onUpdateTitle={updateCardTitle}
                    onAddTask={addTask}
                    onDeleteTask={deleteTask}
                    onToggleTask={toggleTask}
                    onUpdateTaskText={updateTaskText}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </SortableContext>
        </main>
      </div>
    </DndContext>
  );
}

export default BoardPage;
