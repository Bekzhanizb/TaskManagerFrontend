import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchTasks, deleteTask } from "../api";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await fetchTasks();
    setTasks(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Удалить задачу?")) {
      await deleteTask(id);
      loadTasks();
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div>
      <h2 className="page-title">Все задачи</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            {task.image && (
              <img
                src={`http://localhost:8080${task.image}`}
                alt="Task"
                className="task-image"
              />
            )}
            <div className="task-info">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <small className="date">
                {new Date(task.created_at).toLocaleString()}
              </small>
            </div>
            <div className="task-actions">
              <Link className="btn-edit" to={`/tasks/${task.id}/edit`}>
                ✏️
              </Link>
              <button
                className="btn-delete"
                onClick={() => handleDelete(task.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
