import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheckCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



import './TaskList.css';
import Modal from '../Modal/Modal';  // Asegúrate de importar el Modal

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null); // Para almacenar la tarea a editar

  const openModal = () => {
    setTaskToEdit(null); // Modo creación
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task); // Modo edición, pasar la tarea
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTaskSaved = () => {
    fetchTasks(); // Recargar lista después de guardar
  };

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const params = new URLSearchParams();

    if (filter) params.append('search', filter);
    if (statusFilter) params.append('status', statusFilter);
    if (dueDate) {
      const date = new Date(dueDate);
      date.setDate(date.getDate() + 1); // Le restamos un día
      params.append('dueDate', date.toISOString());
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) setTasks(data);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    }
  };

  const handleDelete = async (taskId) => {
    const confirm = window.confirm('¿Estás seguro de eliminar esta tarea?');
    if (!confirm) return;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert('Tarea eliminada exitosamente');
        fetchTasks(); // Recargar tareas
      } else {
        alert(data.error || 'No se pudo eliminar la tarea');
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  // Función para actualizar el estado de la tarea
  const updateTaskStatus = async (taskId, newStatus) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,  // Actualiza el estado
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Estado actualizado');
        fetchTasks(); // Recargar tareas después de la actualización
      } else {
        alert(data.error || 'Error al actualizar el estado');
      }
    } catch (err) {
      console.error('Error al actualizar el estado:', err);
      alert('Error de red');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = () => {
    fetchTasks();
  };

  return (
    <div>
      <br />
      <br />

      <div className="filters-container">
  <input
    type="text"
    placeholder="Buscar por título o descripción..."
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  />

  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
    <option value="">Todos los estados</option>
    <option value="pendiente">Pendiente</option>
    <option value="en progreso">En progreso</option>
    <option value="completada">Completada</option>
  </select>

  <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
  />

  <button onClick={handleSearch} className="search-btn">
    <FontAwesomeIcon icon={faSearch} />
  </button>
</div>



      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Estado</th>
            <th>Fecha límite</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.status}</td>
                <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : ''}</td>
                <td>{task.description}</td>
                <td className="button-container">
  {/* Botón de editar solo si la tarea está pendiente */}
  {task.status === 'pendiente' && (
    <button
      onClick={() => handleEdit(task)}
      className="edit-btn"
      title="Editar"
    >
      <FontAwesomeIcon icon={faEdit} />
    </button>
  )}

  {/* Botón para actualizar a "En Progreso" solo si la tarea está pendiente */}
  {task.status === 'pendiente' && (
    <button
      onClick={() => updateTaskStatus(task.id, 'en progreso')}
      className="update-status-btn"
      title="Actualizar a En Progreso"
    >
      <FontAwesomeIcon icon={faSyncAlt} />
    </button>
  )}

  {/* Botón para actualizar a "Completada" solo si la tarea está en progreso */}
  {task.status === 'en progreso' && (
    <button
      onClick={() => updateTaskStatus(task.id, 'completada')}
      className="update-status-btn"
      title="Actualizar a Completada"
    >
      <FontAwesomeIcon icon={faCheckCircle} />
    </button>
  )}

  {/* Botón de eliminar solo si la tarea está completada */}
  {task.status === 'completada' && (
    <button
      onClick={() => handleDelete(task.id)}
      className="delete-btn"
      title="Eliminar"
    >
      <FontAwesomeIcon icon={faTrash} />
    </button>
  )}
</td>

              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No hay tareas encontradas</td></tr>
          )}
        </tbody>
      </table>

      {/* Modal de creación y edición */}
      <Modal
        isOpen={isModalOpen}
        closeModal={handleCloseModal}
        taskToEdit={taskToEdit}  // Pasamos la tarea a editar al modal
        onTaskSaved={handleTaskSaved}  // Recargar tareas cuando se guarda
      />
    </div>
  );
};

export default TaskList;
