

import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";  
import "./List.css";

function Card({ id, title, tasks, onDelete, onUpdateTitle, onAddTask, onDeleteTask, onToggleTask, onUpdateTaskText }) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);
  const [newTaskText, setNewTaskText] = useState("");

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };
  const cardClasses = classNames("card-component", { dragging: isDragging });


  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (cardTitle !== title) {
      onUpdateTitle(id, cardTitle);
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") handleTitleBlur();
    if (e.key === "Escape") {
      setCardTitle(title);
      setIsEditingTitle(false);
    }
  };


  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(id, newTaskText);
      setNewTaskText("");
    }
  };

  return (
    <div ref={setNodeRef} style={style} className={cardClasses}>
      <div className="card-header">
        <div {...attributes} {...listeners} className="drag-handle">
          <GripVertical size={20} />
        </div>
        {isEditingTitle ? (
          <input
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            autoFocus
            className="title-input"
          />
        ) : (
          <h2 onClick={() => setIsEditingTitle(true)} className="card-title">
            {cardTitle}
          </h2>
        )}
        <button onClick={onDelete} className="delete-card-button">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="card-body">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div key={task._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TaskItem
                task={task}
                onDelete={() => onDeleteTask(id, task._id)}
                onToggle={() => onToggleTask(id, task._id, task.isChecked)}
                onUpdateText={(newText) => onUpdateTaskText(id, task._id, newText)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Adicionar uma tarefa..."
          className="add-task-input"
        />
        <button type="submit">+</button>
      </form>
    </div>
  );
}

export default Card;
