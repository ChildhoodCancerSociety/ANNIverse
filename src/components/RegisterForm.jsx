import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  age: yup.number().positive().integer().required(),
  password: yup.string().min(4).max(15).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

function Form() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(data);
      const result = await response.json();
      console.log(result);
      navigate("/dashboard");
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
          <div className="flex flex-col gap-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="firstName"
              {...register("firstName", { required: true })}
              placeholder="First Name..."
            />
            <p className="text-red-500 font-bold">
              {" "}
              {formState.errors.firstName?.message}{" "}
            </p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="lastName"
              placeholder="Last Name..."
              {...register("lastName", { required: true })}
            />
            <p className="text-red-500 font-bold">
              {" "}
              {formState.errors.lastName?.message}{" "}
            </p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="email"
              placeholder="Email..."
              {...register("email", { required: true })}
            />
            <p className="text-red-500 font-bold">
              {" "}
              {formState.errors.email?.message}{" "}
            </p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="age"
              placeholder="Age..."
              {...register("age", { required: true })}
            />
            <p className="text-red-500 font-bold">
              {" "}
              {formState.errors.age?.message}{" "}
            </p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              placeholder="Password..."
              {...register("password", { required: true })}
            />
            <p className="text-red-500 font-bold">
              {" "}
              {formState.errors.password?.message}{" "}
            </p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password..."
              {...register("confirmPassword", { required: true })}
            />
            <p className="text-red-500 font-bold">
              {formState.errors.confirmPassword && "passwords should match!"}
            </p>
            <div className="flex items-center justify-between">
              <input
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                id="submit"
                value="Sign Up"
              />
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/login"
              >
                Already Signed Up?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
