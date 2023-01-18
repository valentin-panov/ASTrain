import React from "react";

interface IFormError {
  text: string;
}

const FormError: React.FC<IFormError> = ({ text }) => (
  <span className="text-red-500 text-sm">{text}</span>
);

export default FormError;
