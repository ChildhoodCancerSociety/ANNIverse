import React, { useEffect } from "react";

const TaskLists = ({ storedTask, setStoredTask }) => {
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("task"));
    if (storedTasks) {
      setStoredTask(storedTasks);
    }
  }, [localStorage.getItem("task")]);

  return storedTask.map((task, index) => {
    return (
      <div
        key={index}
        className="border p-5 bg-teal-500 text-slate-100 hover:bg-red-900 transition-all ease-in-out duration-300"
      >
        <h3 className="text-xs sm:text-xl md:text-2xl mb-2">
          <span className="text-neutral-800 p-2 font-bold ">Task name:</span>
          {task.taskName}
        </h3>
        <p className="text-xs sm:text-lg md:text-xl mb-2">
          <span className="text-neutral-800 p-2 font-bold ">Assignee:</span>{" "}
          {task.assignee}
        </p>
        <p className="text-xs sm:text-lg md:text-xl">
          <span className="text-neutral-800 p-2 font-bold ">Description:</span>
          {task.description}
        </p>
      </div>
    );
  });
};

export default TaskLists;
