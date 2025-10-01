import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import "./List.css";

function Card() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const AdicionaNovaTarefa = () => {
    if (inputValue.trim() === "") {
      alert("Adicione uma tarefa!");
      return;
    }

    const newTask = {
      id: Date.now,
      text: inputValue,
      isChecked: false,
    };

    setTasks([...tasks, newTask]);
    setInputValue("");
  };
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
    <div className="container">
      <div className="lista-tarefas">
        <h2>Lista de Tarefas </h2>
        <div class="linha">
          <Input value={inputValue} onChange={setInputValue} />
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
    </div>
  );
}

export default Card;
