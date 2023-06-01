"use client";

import React from "react";

import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as Yup from "yup";

import FormInput from "./form/FormInput";

const signUpSchema = Yup.object({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  username: Yup.string().required("Please enter a unique username"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter a valid email"),
  password: Yup.string().required("Please enter a valid password"),
  verifyPassword: Yup.string().required("Passwords did not match"),
});

interface MyFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  verifyPassword: string;
  radio: string;
}

export const SignUpModal = () => {
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
    radio: "",
  };
  return (
    <div
      className="block w-[400px] bg-neutral-100 p-3 text-center 
    align-middle"
    >
      <h1 className="fontFamily-sans text-[40px] font-bold text-neutral-900">
        Sign in
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={(values: any, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(true);
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <FormInput
              name="firstName"
              type="firstName"
              placeholder="First Name"
            />
            <FormInput
              name="lastName"
              type="lastName"
              placeholder="Last Name"
            />
            <FormInput name="username" type="username" placeholder="Username" />
            <FormInput name="email" type="email" placeholder="Email" />
            <FormInput name="password" type="password" placeholder="Password" />
            <FormInput
              name="verifyPassword"
              type="verifyPassword"
              placeholder="Verify Password"
            />
            <button
              disabled={!isValid || isSubmitting || !dirty}
              className="text-neutral-900"
              type="submit"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
