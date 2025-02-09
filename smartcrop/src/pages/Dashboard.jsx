import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Agricultural Tasks</h1>
      <button
        onClick={() => navigate('/tasks')}
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
      >
        Add Task
      </button>

      <div className="mt-6">
        {tasks.map((task, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-lg mb-2">
            <h3 className="font-bold">{task.title}</h3>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;