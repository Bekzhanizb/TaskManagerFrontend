import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { createTask, fetchTask, updateTask } from "../api";

function TaskForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    completed: false,
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetchTask(id).then((res) => {
        const task = res.data;
        setForm({
          title: task.title,
          description: task.description,
          completed: task.completed,
          image: task.image || "",
        });
      });
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = form.image;
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const uploadRes = await axios.post("http://localhost:8080/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.url;
      } catch (err) {
        console.error("Ошибка загрузки файла:", err);
      }
    }

    const taskData = { ...form, image: imageUrl };
    if (isEditing) await updateTask(id, taskData);
    else await createTask(taskData);

    navigate("/");
  };

  return (
    <div>
      <h2 className="page-title">
        {isEditing ? "Редактировать задачу" : "Новая задача"}
      </h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Заголовок"
          className="input"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Описание"
          className="textarea"
          required
        />
        <div className="upload-block">
          <label>Изображение:</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {form.image && (
            <img
              src={`http://localhost:8080${form.image}`}
              alt="preview"
              className="preview"
            />
          )}
        </div>
        <label className="checkbox">
          <input
            type="checkbox"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
          />
          Выполнено
        </label>
        <button type="submit" className="btn-primary">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
