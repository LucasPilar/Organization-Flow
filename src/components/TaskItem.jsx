// src/components/TaskItem.jsx (CORRIGIDO)

import React, { useState, useEffect, useRef } from "react";
import "./TaskItem.css";

function TaskItem({
  task,
  cardId,
  onToggleTask,
  onDeleteTask,
  onUpdateTaskText,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (text.trim() === "") {
      setText(task.text);
    } else {
      onUpdateTaskText(cardId, task.id, text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      setText(task.text);
      setIsEditing(false);
    }
  };

  // A CHAVE ERRADA QUE ESTAVA AQUI FOI REMOVIDA.

  return (
    <li
      className={task.isChecked ? "checado" : ""}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          className="task-edit-input"
        />
      ) : (
        <>
          <span
            className="task-text"
            onClick={() => onToggleTask(cardId, task.id)}
          >
            {task.text}
          </span>
          <span
            className="delete-task"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(cardId, task.id);
            }}
          >
            X
          </span>
        </>
      )}
    </li>
  );
}

export default TaskItem;
