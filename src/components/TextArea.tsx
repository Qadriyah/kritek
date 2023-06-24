import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { BsInfoCircleFill } from "react-icons/bs";

type TextAreaTypes = InputHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
  rows?: number;
};

const TextArea: React.FC<TextAreaTypes> = ({ label, ...props }) => {
  const [field, { error }] = useField(props);

  return (
    <div
      style={{
        marginBottom: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {label ? (
        <label htmlFor={props.name} style={{ marginLeft: "5px" }}>
          <span>{label}</span>
        </label>
      ) : null}
      <textarea
        {...field}
        {...props}
        id={props.name}
        name={props.name}
        style={{
          flex: 1,
          borderRadius: "5px",
          border: `solid 1px ${error ? "red" : "#ccc"}`,
          paddingLeft: "10px",
          marginTop: "2px",
        }}
      />
      {error ? (
        <div
          style={{
            marginTop: "2px",
            display: "flex",
            alignItems: "center",
            marginLeft: "5px",
            color: "red",
            gap: 3,
          }}
        >
          <BsInfoCircleFill />
          <span>{error}</span>
        </div>
      ) : null}
    </div>
  );
};

export default TextArea;
