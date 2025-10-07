import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import "./List.css";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ id, initialTitle, onUpdateTitle, onDelete }) {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [cardTitle, setCardTitle] = useState(initialTitle);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const AdicionaNovaTarefa = () => {
    if (inputValue.trim() === "") {
      alert("Adicione uma tarefa!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };

  //INICIO TITULO

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (e) => {
    setCardTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
    onUpdateTitle(id, cardTitle);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  //FIM Titulo

  const handleToggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  return (
    <div className="card-component"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="card-header">
        {isEditingTitle ? (
          <input
            type="text"
            value={cardTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleTitleKeyDown}
            className="title-input"
            autoFocus
          />
        ) : (
          // CORREÇÃO 2: Usar 'onClick' com 'C' maiúsculo
          <h2 onClick={handleTitleClick} className="card-title">
            {cardTitle}
          </h2>
        )}
        <button onClick={onDelete} className="delete-card-button">
          <Trash2 />
        </button>
      </div>

      {/* --- SEÇÃO DO CORPO DO CARD --- */}
      <div className="linha">
        <Input value={inputValue} onChange={(value) => setInputValue(value)} />
        <Button onClick={AdicionaNovaTarefa} />
      </div>
      <ul id="lista">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={task.isChecked ? "checado" : ""}
            onClick={() => handleToggleTask(task.id)}
          >
            {task.text}
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteTask(task.id);
              }}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Card;
