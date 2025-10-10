import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../api';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        const res = await fetchTasks();
        setTasks(res.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Удалить задачу?')) {
            await deleteTask(id);
            loadTasks();
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    return (
        <div>
            <h4>Все задачи</h4>
            <table className="table table-bordered mt-3">
                <thead className="table-light">
                <tr>
                    <th>Заголовок</th>
                    <th>Описание</th>
                    <th>Статус</th>
                    <th>Срок</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map(task => (
                    <tr key={task.id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>{task.done ? '✅' : '❌'}</td>
                        <td>{new Date(task.due_date).toLocaleDateString()}</td>
                        <td>
                            <Link className="btn btn-sm btn-warning me-2" to={`/tasks/${task.id}/edit`}>Редактировать</Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
