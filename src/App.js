import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 Task Manager</h1>
        <Link to="/tasks/new" className="btn-primary">
          + Новая задача
        </Link>
      </header>

      <main className="content-card">
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:id/edit" element={<TaskForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
