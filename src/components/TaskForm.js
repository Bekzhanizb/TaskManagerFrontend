import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTask, fetchTask, updateTask } from '../api';

function TaskForm() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        due_date: '',
        done: false
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            fetchTask(id).then(res => {
                const task = res.data;
                setForm({
                    title: task.title,
                    description: task.description,
                    due_date: task.due_date.split('T')[0],
                    done: task.done
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateTask(id, form);
        } else {
            await createTask(form);
        }
        navigate('/');
    };

    return (
        <div>
            <h4>{isEditing ? 'Редактировать задачу' : 'Новая задача'}</h4>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Заголовок</label>
                    <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Описание</label>
                    <textarea className="form-control" name="description" value={form.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Срок (дата)</label>
                    <input type="date" className="form-control" name="due_date" value={form.due_date} onChange={handleChange} required />
                </div>
                <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" name="done" checked={form.done} onChange={handleChange} />
                    <label className="form-check-label">Выполнено</label>
                </div>
                <button className="btn btn-success" type="submit">Сохранить</button>
            </form>
        </div>
    );
}

export default TaskForm;
