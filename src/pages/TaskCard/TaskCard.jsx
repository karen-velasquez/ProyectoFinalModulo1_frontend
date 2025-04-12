// TaskCard.jsx
import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task }) => {
  return (
    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>
        <div className="ag-courses-item_title">{task.title}</div>
        <div className="ag-courses-item_date-box">
          Estado: <span className="ag-courses-item_date">{task.status}</span>
        </div>
        <div className="ag-courses-item_date-box">
          Fecha límite:{" "}
          <span className="ag-courses-item_date">
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </a>
    </div>
  );
};

export default TaskCard;
