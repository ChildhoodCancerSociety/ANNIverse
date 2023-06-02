import { ErrorMessage, Field } from "formik";
import type { FieldProps } from "formik";

// Having issues with 'extends FieldProps'
interface Props {
  name: string;
  placeholder: string;
  type: string;
  label?: string;
  icon?: any;
  overwriteClassName?: boolean;
  className?: string;
  lefticon?: boolean;
  righticon?: boolean;
}

const FormInput = (props: Props) => {
  const inputClasses = props.overwriteClassName
    ? props.className
    : "my-3 h-[44px] w-full rounded-lg pl-2 bg-neutral-50 border-neutral-400 border-[1px] drop-shadow-lg active:border-blue-500 focus:border-blue-500 disabled:bg-neutral-100 disabled:text-neutral-400 invalid:border-brown-500 text-neutral-900 pl-[44px] required";
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <div className="relative">
        <Field
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          className={inputClasses}
        />
        {props.lefticon ? (
          <div className="absolute left-[16px] top-6 text-[20px]">
            {props.icon}
          </div>
        ) : null}
        {props.righticon ? (
          <div className="absolute right-[16px] top-6 text-[20px]">
            {props.icon}
          </div>
        ) : null}
      </div>
      <ErrorMessage name={props.name}>
        {(msg) => <div className="text-xs text-brown-500">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default FormInput;
