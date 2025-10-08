import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import "./List.css";
import { Trash2, GripVertical } from "lucide-react"; // Importa o ícone de "agarrar"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import TaskItem from "./TaskItem";


// O componente agora recebe todas as funções e dados de App.js
function Card({
  id,
  title,
  tasks,
  onUpdateTitle,
  onDelete,
  onAddTask,
  onDeleteTask,
  onToggleTask,
  onUpdateTaskText,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState(title);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ 
      id: id,
      transition: null,
    });

  const style = {
    transform: isDragging ? CSS.Transform.toString(transform) : undefined,
    
  };

  const cardClasses = classNames("card-component", { dragging: isDragging });

  const handleAddTask = () => {
    if (inputValue.trim() === "") {
      alert("Adicione uma tarefa!");
      return;
    }
    onAddTask(id, inputValue); // Chama a função que está em App.js
    setInputValue("");
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    if (cardTitle.trim() === "") {
      setCardTitle(title); // Restaura o título original se ficar vazio
    } else {
      onUpdateTitle(id, cardTitle); // Atualiza o título em App.js
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") handleTitleBlur();
    if (e.key === "Escape") {
      setCardTitle(title);
      setIsEditingTitle(false);
    }
  };

  return (
    <div className={cardClasses} ref={setNodeRef} style={style}>
      <div className="card-header">
        <div className="drag-handle" {...attributes} {...listeners}>
          <GripVertical size={20} />
        </div>

        {isEditingTitle ? (
          <input
            type="text"
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="title-input"
            autoFocus
          />
        ) : (
          <h2 onClick={() => setIsEditingTitle(true)} className="card-title">
            {title}
          </h2> 
        )}
        <button onClick={onDelete} className="delete-card-button">
          <Trash2 />
        </button>
      </div>

      <div className="linha">
        <Input value={inputValue} onChange={(value) => setInputValue(value)} />
        <Button onClick={handleAddTask} />
      </div>

      <ul id="lista">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            cardId={id}
            onToggleTask={onToggleTask}
            onDeleteTask={onDeleteTask}
            onUpdateTaskText={onUpdateTaskText}

          />
        ))}
      </ul>
    </div>
  );
}

export default Card;
