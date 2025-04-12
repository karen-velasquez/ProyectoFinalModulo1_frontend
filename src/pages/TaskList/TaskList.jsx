import React, { useState, useEffect } from 'react';
import TaskCard from '../TaskCard/TaskCard';


const TaskList = () => {
  const [tasks, setTasks] = useState([]); // Tareas sin filtrar
  const [filter, setFilter] = useState('');  // Filtro de nombre de la tarea
  const [statusFilter, setStatusFilter] = useState(''); // Filtro por estado
  const [filteredTasks, setFilteredTasks] = useState([]); // Tareas filtradas

  useEffect(() => {
    // Función para obtener las tareas
    const fetchTasks = async () => {
      const token = localStorage.getItem('token'); // Recuperar token del localStorage

      try {
        const res = await fetch('http://localhost:3000/api/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Autorización usando el token JWT
          },
        });

        const data = await res.json();

        // Verifica si la respuesta es exitosa y si es un arreglo
        if (res.ok && Array.isArray(data)) {
          setTasks(data);
          setFilteredTasks(data); // Inicialmente muestra todas las tareas
        } else {
          console.log('Error al obtener tareas:', data.message || 'No se encontraron tareas');
        }
      } catch (err) {
        console.error('Error de conexión:', err);
      }
    };

    fetchTasks();
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  // Función para aplicar los filtros
  const handleSearch = () => {
    const filtered = tasks.filter(task => {
      return (
        (statusFilter ? task.status === statusFilter : true) && // Filtrar por estado
        (filter ? task.title.toLowerCase().includes(filter.toLowerCase()) : true) // Filtrar por búsqueda
      );
    });
    setFilteredTasks(filtered);
  };

  // Función para manejar cambios en el filtro de texto
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    handleSearch(); // Aplica el filtro inmediatamente al cambiar el texto
  };

  // Función para manejar cambios en el filtro de estado
  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    handleSearch(); // Aplica el filtro inmediatamente al cambiar el estado
  };

  return (
    <div>
      <h2>Lista de Tareas</h2>

      {/* Filtro de búsqueda */}
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={filter}
        onChange={handleFilterChange}
      />

      {/* Filtro por estado */}
      <select onChange={handleStatusChange} value={statusFilter}>
        <option value="">Filtrar por estado</option>
        <option value="pendiente">pendiente</option>
        <option value="completada">completada</option>
      </select>

      {/* Botón de búsqueda */}
      <button onClick={handleSearch}>Buscar</button>

      {/* Mostrar tareas filtradas */}
      <div className="ag-format-container">
        <div className="ag-courses_box">
          {filteredTasks && filteredTasks.length > 0 ? (
            filteredTasks.map(task => <TaskCard key={task.id} task={task} />)
          ) : (
            <p>No hay tareas disponibles.</p>
          )}
        </div>
      </div>

    </div>
  );
};

export default TaskList;
