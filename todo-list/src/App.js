import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskStatus, setTaskStatus] = useState('Pending');
  const [dueDate, setDueDate] = useState('');
  const [serialId, setSerialId] = useState(1); // State for serial ID

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescChange = (event) => {
    setTaskDesc(event.target.value);
  };

  const handleTaskStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      alert('Task name cannot be empty!');
      return;
    }

    const newTask = {
      id: uuidv4(), // Generate UUID
      serialId: serialId, // Use serial ID
      name: taskName,
      desc: taskDesc,
      status: taskStatus,
      dueDate: dueDate || 'No due date',
    };

    setTasks([...tasks, newTask]);
    setSerialId(serialId + 1); // Increment serial ID for the next task
    setTaskName('');
    setTaskDesc('');
    setTaskStatus('Pending'); // Reset status to default after adding task
    setDueDate('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Title"
          value={taskName}
          onChange={handleTaskNameChange}
        />
        <input
          type="text"
          placeholder="Description"
          value={taskDesc}
          onChange={handleTaskDescChange}
        />
        <select
          value={taskStatus}
          onChange={handleTaskStatusChange}
        >
          <option value="Pending">Pending</option>
          <option value="Active">Active</option>
        </select>
        <input
  type="date"
  placeholder="Select Due Date" 
  value={dueDate}
  onChange={handleDueDateChange}
/>

        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        <li className="task-header">
          <span>Task Name</span>
          <span>Task Description</span>
          <span>Status</span>
          <span>Due Date</span>
          <span>Action</span>
        </li>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.name}</span>
            <span>{task.desc}</span>
            <span>{task.status}</span>
            <span>{task.dueDate}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
