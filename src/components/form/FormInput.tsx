import { Field } from 'formik';
import { Fragment } from 'react';

const FormInput = ({
  label,
  name,
  placeholder,
  type,
  icon,
  value,
}: {
  label?: string;
  name: string;
  placeholder: string;
  type: string;
  value?: string;
  icon?: object;
}) => {
  return (
    <Fragment>
      <label htmlFor={label}>{label}</label>
      <Field
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        icon={icon}
        className="my-3 h-[44px] w-full rounded-lg pl-2 bg-neutral-50 border-neutral-400 border-[1px] drop-shadow-lg active:border-blue-500 focus:border-blue-500 disabled:bg-neutral-100 disabled:text-neutral-400 invalid:border-brown-500 text-neutral-900 required"
      />
    </Fragment>
  );
};

export default FormInput;
