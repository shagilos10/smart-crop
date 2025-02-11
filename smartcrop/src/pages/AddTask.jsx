import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = ({ addTask }) => {
  const navigate = useNavigate();
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'Pending',
    priority: 'Low',
    dueDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleAddTask = () => {
    addTask(newTask);
    navigate('/');
  };

  return (
    <div className='flex justify-center items-center bg-[#E4FFF2] h-screen'>
          <div className="p-4 bg-white flex flex-col justify-center items-center w-150">
      <h1 className="text-2xl font-bold mb-4 ">Add New Task</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newTask.title}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
      />
      <select
        name="status"
        value={newTask.status}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        name="priority"
        value={newTask.priority}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={newTask.dueDate}
        onChange={handleInputChange}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="flex justify-end">
        <button
          onClick={() => navigate('/dashboard')}
          className=" text-green-700 px-4 py-2 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleAddTask}
          className="bg-green-700 text-white px-4 py-2 rounded hover:text-green-800"
        >
          Add Task
        </button>
      </div>
    </div>
    </div>

  );
};

export default AddTask;