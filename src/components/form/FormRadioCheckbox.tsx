"use client";

import { Field } from "formik";

const FormRadioCheckbox = ({
  label,
  name,
  type,
  icon,
  value,
}: {
  label?: string;
  name: string;
  type: string;
  value?: string;
  icon?: object;
}) => {
  return (
    <>
      <label htmlFor={label}>{label}</label>
      <Field
        type={type}
        id={name}
        name={name}
        value={value}
        icon={icon}
        className="required  my-3 w-full rounded-lg border-[1px] border-neutral-400 bg-neutral-50 pl-2 text-neutral-900 drop-shadow-lg invalid:border-brown-500 focus:border-blue-500 active:border-blue-500 disabled:bg-neutral-100 disabled:text-neutral-400"
      />
    </>
  );
};

export default FormRadioCheckbox;
