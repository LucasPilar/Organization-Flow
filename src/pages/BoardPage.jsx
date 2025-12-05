import React, { useState, useEffect } from "react";
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
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

function BoardPage({ onLogout }) {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await api.get("/cards");
        setCardList(res.data);
      } catch (err) {
        console.error("Erro ao buscar cards:", err);

        setError(
          "Não foi possível carregar os cards. Verifique sua conexão ou tente fazer login novamente."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);
  const addCard = async () => {
    try {
      const res = await api.post("/cards", { title: "Nova Lista" });
      setCardList((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Erro ao adicionar card:", err);
      setError("Não foi possível adicionar o card.");
    }
  };

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
    <div className="App">
      <Navbar onAddCardClick={addCard} onLogout={onLogout} />
      <main className="card-container">
        {loading && <p className="loading-message">Carregando seus cards...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={cardList} strategy={rectSortingStrategy}>
              <AnimatePresence>
                {cardList.length > 0 ? (
                  cardList.map((card) => (
                    <motion.div
                      key={card._id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                    >
                      <Card
                        id={card._id} // Use _id
                        title={card.title}
                        tasks={card.tasks}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="empty-board">
                    <h2>Nenhum card encontrado.</h2>
                    <p>
                      Que tal criar o primeiro clicando em "Adicionar Card"?
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </SortableContext>
          </DndContext>
        )}
      </main>
    </div>
  );
}

export default BoardPage;
