import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api', // ⚠️ Замените при необходимости
});

export const fetchTasks = () => API.get('/tasks');
export const fetchTask = (id) => API.get(`/tasks/${id}`);
export const createTask = (task) => API.post('/tasks', task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
