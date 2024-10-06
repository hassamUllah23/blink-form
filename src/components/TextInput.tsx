import { FC } from "react";
import { Field } from "react-final-form";
import { ChangeEvent, CSSProperties } from "react";
import {
  generateYupSchema,
  validateYupSchema,
  ValidationOptions,
} from "../helpers/schema-generator";

type TextInputProps = {
  name: string; // Formik requires name to map the input to form state
  label: string;
  value: any;
  placeholder?: string;
  styles?: CSSProperties; // Type for inline styles
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: {
    className?: string; // Custom class for error message
    style?: CSSProperties; // Custom inline style for error message
  };
  validations: ValidationOptions;
};

const TextInput: FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  styles,
  disabled,
  value,
  onChange,
  error,
  validations,
}) => {
  // const [field, meta] = useField(name); // Using Formik's useField hook
  const schema = generateYupSchema([
    {
      name: name,
      type: "text",
      validations: validations,
    },
  ]);
  console.log("SCHEMA", schema)
  return (
    <>
      <Field name="singleField" validate={validateYupSchema(schema, value)}>
        {({ input, meta }) => (
          <div>
            <input
              {...input}
              type="text"
              placeholder={placeholder ? placeholder : `Enter ${label}`}
              onChange={onChange}
              style={{
                borderColor: meta.touched && meta.error ? "red" : "black",
                ...styles,
              }}
              disabled={disabled}
            />
            {meta.touched && meta.error && (
              <span
                style={{ color: "red", ...error?.style }}
                className={` ${error?.className}`}
              >
                {meta.error}
              </span>
            )}
          </div>
        )}
      </Field>
    </>
  );
};

export { TextInput };
