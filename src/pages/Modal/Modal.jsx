import React, { useState, useEffect } from 'react';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, closeModal, taskToEdit, onTaskSaved }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      // Rellenar los campos si es edición
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        dueDate: taskToEdit.dueDate ? taskToEdit.dueDate.split('T')[0] : ''
      });
    } else {
      // Limpiar si es nuevo
      setFormData({ title: '', description: '', dueDate: '' });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const method = taskToEdit ? 'PUT' : 'POST';
    const url = taskToEdit
      ? `http://localhost:3000/api/tasks/${taskToEdit.id}`
      : 'http://localhost:3000/api/tasks';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          status: taskToEdit ? taskToEdit.status : 'pendiente'
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert(taskToEdit ? 'Tarea actualizada' : 'Tarea creada');
        closeModal();
        onTaskSaved(); // Recarga las tareas
      } else {
        alert(data.error || 'Ocurrió un error');
      }
    } catch (err) {
      console.error(err);
      alert('Error de red');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-popup">
        <button onClick={closeModal}>×</button>
        <h2>{taskToEdit ? 'Editar Tarea' : 'Registrar Nueva Tarea'}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
         <button className="button-click" type="submit">
            {taskToEdit ? (
              <FontAwesomeIcon icon={faEdit} /> // Lápiz para editar
            ) : (
              <FontAwesomeIcon icon={faCheckCircle} /> // Check para guardar
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
