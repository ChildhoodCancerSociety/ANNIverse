'use client';

import FormInput from './form/FormInput';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import React from 'react';

const signUpSchema = Yup.object({
  firstName: Yup.string().required('Please enter your first name'),
  lastName: Yup.string().required('Please enter your last name'),
  username: Yup.string().required('Please enter a unique username'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter a valid email'),
  password: Yup.string().required('Please enter a valid password'),
  verifyPassword: Yup.string().required('Passwords did not match'),
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
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    verifyPassword: '',
    radio: '',
  };
  return (
    <div
      className="text-center w-[400px] p-3 align-middle bg-neutral-100 
    block"
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
            <ErrorMessage name="firstName">
              {(msg) => <div className="text-brown-500 text-xs">{msg}</div>}
            </ErrorMessage>
            <FormInput
              name="lastName"
              type="lastName"
              placeholder="Last Name"
            />
            <ErrorMessage name="lastName">
              {(msg) => <div className="text-brown-500 text-xs">{msg}</div>}
            </ErrorMessage>
            <FormInput name="username" type="username" placeholder="Username" />
            <ErrorMessage name="username">
              {(msg) => <div className="text-brown-500 text-xs">{msg}</div>}
            </ErrorMessage>

            <FormInput name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email">
              {(msg) => <div className="text-brown-500 text-xs">{msg}</div>}
            </ErrorMessage>
            <FormInput name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password">
              {(msg) => <div className="text-brown-500 text-xs">{msg}</div>}
            </ErrorMessage>
            <FormInput
              name="verifyPassword"
              type="verifyPassword"
              placeholder="Verify Password"
            />
            <ErrorMessage name="verifyPassword">
              {(msg) => <div className="text-brown-500 text-xs">{msg}</div>}
            </ErrorMessage>
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
