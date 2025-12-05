import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";

import Card from "../components/Card";
import Navbar from "../components/Navbar";
import "../App.css";

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

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete api.defaults.headers.common["x-auth-token"];
  }
};

function BoardPage({ onLogout }) {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCards = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      onLogout();
      return;
    }
    setAuthToken(token);
    try {
      setLoading(true);
      const res = await api.get("/cards");
      const formattedCards = res.data.map((card) => ({
        ...card,
        id: card._id,
      }));
      setCardList(formattedCards);
    } catch (err) {
      console.error("Erro ao buscar cards:", err);
      if (err.response && err.response.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [onLogout]);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const addCard = async () => {
    try {
      const res = await api.post("/cards", { title: "Nova Lista" });
      const newCard = { ...res.data, id: res.data._id };
      setCardList((prev) => [...prev, newCard]);
    } catch (err) {
      console.error("Erro ao adicionar card:", err);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await api.delete(`/cards/${cardId}`);
      setCardList((prev) => prev.filter((card) => card.id !== cardId));
    } catch (err) {
      console.error("Erro ao deletar card:", err);
    }
  };

  const updateCardTitle = async (cardId, newTitle) => {
    const originalCardList = [...cardList];
    const updatedList = cardList.map((card) =>
      card.id === cardId ? { ...card, title: newTitle } : card
    );
    setCardList(updatedList);
    try {
      await api.put(`/cards/${cardId}`, { title: newTitle });
    } catch (err) {
      console.error("Erro ao atualizar título:", err);
      setCardList(originalCardList);
    }
  };

  const addTask = async (cardId, taskText) => {
    try {
      const res = await api.post(`/cards/${cardId}/tasks`, { text: taskText });
      const newTask = res.data;
      const updatedList = cardList.map((card) =>
        card.id === cardId ? { ...card, tasks: [...card.tasks, newTask] } : card
      );
      setCardList(updatedList);
    } catch (err) {
      console.error("Erro ao adicionar tarefa:", err);
    }
  };

  const deleteTask = async (cardId, taskId) => {
    try {
      await api.delete(`/cards/${cardId}/tasks/${taskId}`);
      const updatedList = cardList.map((card) =>
        card.id === cardId
          ? { ...card, tasks: card.tasks.filter((task) => task._id !== taskId) }
          : card
      );
      setCardList(updatedList);
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
    }
  };

  const toggleTask = async (cardId, taskId, currentStatus) => {
    try {
      await api.put(`/cards/${cardId}/tasks/${taskId}`, {
        isChecked: !currentStatus,
      });
      const updatedList = cardList.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: card.tasks.map((task) =>
                task._id === taskId
                  ? { ...task, isChecked: !task.isChecked }
                  : task
              ),
            }
          : card
      );
      setCardList(updatedList);
    } catch (err) {
      console.error("Erro ao alternar tarefa:", err);
    }
  };

  const updateTaskText = async (cardId, taskId, newText) => {
    try {
      await api.put(`/cards/${cardId}/tasks/${taskId}`, { text: newText });
      const updatedList = cardList.map((card) =>
        card.id === cardId
          ? {
              ...card,
              tasks: card.tasks.map((task) =>
                task._id === taskId ? { ...task, text: newText } : task
              ),
            }
          : card
      );
      setCardList(updatedList);
    } catch (err) {
      console.error("Erro ao atualizar texto da tarefa:", err);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = cardList.findIndex((item) => item.id === active.id);
      const newIndex = cardList.findIndex((item) => item.id === over.id);
      const reorderedList = arrayMove(cardList, oldIndex, newIndex);
      setCardList(reorderedList);
    }
  }

  if (loading) {
    return <div className="loading-container">Carregando...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="App">
        <Navbar onAddCardClick={addCard} onLogout={onLogout} />
        <main className="card-container">
          <SortableContext items={cardList} strategy={rectSortingStrategy}>
            <AnimatePresence>
              {cardList.map((card) => (
                <motion.div key={card.id} layout /* ... */>
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
