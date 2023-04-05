import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  taskName: yup.string().required(),
  assignee: yup.string().min(4).max(15).required(),
  description: yup.string().min(15).max(60).required(),
});

const TaskForm = ({ onAddTask }) => {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/createTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      const result = await response.json();
      console.log(result);
      onAddTask(data);
      navigate("/viewTaskList");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-lg">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(submitForm)}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="taskName"
            >
              Task name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="taskName"
              type="text"
              placeholder="Taskname.."
              {...register("taskName", { required: true })}
            />
            <p className="text-red-500 font-bold">
              {formState.errors.taskName?.message}
            </p>
          </div>
          <div className="relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="assignee"
            >
              Assignee
            </label>
            <select
              id="assignee"
              {...register("assignee", { required: true })}
              className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 mb-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="Ibrahim">Ibrahim</option>
              <option value="Zane">Zane</option>
              <option value="Rufan">Rufan</option>
            </select>
            <p className="text-red-500 font-bold">
              {formState.errors.assignee?.message}
            </p>
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
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Task description.."
              {...register("description", { required: true })}
            />
            <p className="text-red-500 font-bold">
              {formState.errors.description?.message}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <input
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              id="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
