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

const signInSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter a valid email'),
  password: Yup.string().required('Please enter a valid password'),
});

interface MyFormValues {
  email: string;
  password: string;
}

export const SignInModal = () => {
  const initialValues: MyFormValues = { email: '', password: '' };
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
        validationSchema={signInSchema}
        onSubmit={(values: any, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(true);
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <FormInput name="email" type="email" placeholder="Email" />
            <ErrorMessage name="email">
              {(msg) => <div className="text-brown-500 text-xs">{msg}</div>}
            </ErrorMessage>
            <FormInput name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password">
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
