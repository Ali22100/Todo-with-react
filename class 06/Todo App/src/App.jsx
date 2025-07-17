import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);

  const addTask = () => {
    if (task.trim() === '') return;

    editId !== null
      ? (() => {
          let updated = [...tasks];
          updated[editId].text = task;
          setTasks(updated);
          setEditId(null);
        })()
      : setTasks([...tasks, { text: task, done: false }]);

    setTask('');
  };

  const deleteTask = (index) => {
    let updated = tasks.filter((item, i) => i !== index);
    setTasks(updated);
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditId(index);
  };

  const markDone = (index) => {
    let updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div className="main-box">
      <h2 className="text-center text-white mb-4">My Todo List</h2>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Type a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn btn-light" onClick={addTask}>
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul className="list-group">
        {tasks.map((item, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              style={{
                textDecoration: item.done ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => markDone(i)}
            >
              {item.text}
            </span>
            <div>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => editTask(i)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteTask(i)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
