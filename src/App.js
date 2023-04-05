import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TaskForm from "./components/TaskForm";
import TaskLists from "./components/TaskLists";
import Dashboard from "./components/Dashboard";

function App() {
  const [tasks, setTasks] = useState([]);
  const [storedTask, setStoredTask] = useState([]);

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    const updatedStoredTasks = [...storedTask, task];
    setStoredTask(updatedStoredTasks);
    localStorage.setItem("task", JSON.stringify(updatedStoredTasks));
  };

  console.log(tasks);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/createTask"
          element={<TaskForm onAddTask={addTaskHandler} />}
        />
        <Route
          path="/viewTaskList"
          element={
            <TaskLists
              tasks={tasks}
              storedTask={storedTask}
              setStoredTask={setStoredTask}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
