import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = ({ onAddTask }) => {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");

  const taskNameHandler = (event) => {
    setTaskName(event.target.value);
  };
  const assigneeHandler = (event) => {
    setAssignee(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const formHandler = (event) => {
    event.preventDefault();
    const obj = {
      taskName,
      assignee,
      description,
    };
    onAddTask(obj);
    navigate("/viewTaskList");
    setTaskName("");
    setDescription("");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taskname"
            >
              Task name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="taskname"
              type="text"
              placeholder="Taskname.."
              onChange={taskNameHandler}
              value={taskName}
            />
          </div>
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="assignee"
            >
              Assignee
            </label>
            <select
              onChange={assigneeHandler}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="assignee"
            >
              <option value="Ibrahim">Ibrahim</option>
              <option value="Zane">Zane</option>
              <option value="Rufan">Rufan</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              onChange={descriptionHandler}
              value={description}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Task description.."
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={formHandler}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
