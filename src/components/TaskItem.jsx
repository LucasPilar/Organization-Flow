import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import './TaskItem.css'; 

function TaskItem({ task, onDelete, onToggle, onUpdateText }) {
 
  const [isEditing, setIsEditing] = useState(false);

  const [editText, setEditText] = useState(task.text);


  const handleUpdate = () => {
    setIsEditing(false);
   
    if (editText.trim() && editText !== task.text) {
      onUpdateText(editText);
    } else {
     
      setEditText(task.text);
    }
  };

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
    
      setEditText(task.text);
      setIsEditing(false);
    }
  };

 
  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate} 
          onKeyDown={handleKeyDown}
          autoFocus 
          className="task-edit-input"
        />
      </div>
    );
  }

 
  return (
    <div className={`task-item ${task.isChecked ? 'checked' : ''}`}>
     
      <input
        type="checkbox"
        checked={task.isChecked}
        onChange={onToggle}
        className="task-checkbox"
      />

 
      <span onDoubleClick={() => setIsEditing(true)} className="task-text">
        {task.text}
      </span>

     
      <button onClick={onDelete} className="delete-task-button">
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default TaskItem;
