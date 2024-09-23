import React, { useEffect, useState } from "react";
import "./style.css";
import { RiDeleteBin5Line } from "react-icons/ri";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;

    fetch("http://localhost:8080/api/tasks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, completed: false }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
        setNewTask("");
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const toggleTask = (task) => {
    fetch(`http://localhost:8080/api/tasks/complete?id=${task.id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
      })
      .catch((error) => console.error("Error toggling task:", error));
  };

  const deleteTask = (task, e) => {
    e.stopPropagation();
    fetch(`http://localhost:8080/api/tasks/delete?id=${task.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== task.id));
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  return (
    <>
      <section className="container">
        <h1>Task Management</h1>
        <div className="input-group">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
          />
          <button className="btn-add" onClick={addTask}>
            Add Task
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? "completed" : ""}`}
            >
              <div className="task-info">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task)}
                />
                <span>{task.title}</span>
              </div>
              <div className="tag-container">
                {task.completed ? (
                  <span className="tag completed">COMPLETED</span>
                ) : (
                  <span className="tag incomplete">INCOMPLETE</span>
                )}
              </div>
              <button
                className="btn-delete"
                onClick={(e) => deleteTask(task, e)}
              >
                <RiDeleteBin5Line />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default Home;
