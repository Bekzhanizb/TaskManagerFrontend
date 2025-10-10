import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
    return (
        <div className="container mt-4">
            <nav className="d-flex justify-content-between mb-4">
                <h2>📝 Task Manager</h2>
                <Link className="btn btn-primary" to="/tasks/new">➕ Новая задача</Link>
            </nav>

            <Routes>
                <Route path="/" element={<TaskList />} />
                <Route path="/tasks/new" element={<TaskForm />} />
                <Route path="/tasks/:id/edit" element={<TaskForm />} />
            </Routes>
        </div>
    );
}

export default App;
