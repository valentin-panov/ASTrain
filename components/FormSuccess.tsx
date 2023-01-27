import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface IFormSuccess {
  text: string;
}

const FormSuccess: React.FC<IFormSuccess> = ({ text }) => (
  <section className="text-center p-2 mb-2 rounded border border-green-600 bg-green-100">
    <p className="text-green-700 font-bold">
      <CheckCircleOutlineIcon />
      <span className="ml-1">{text}</span>
    </p>
  </section>
);

export default FormSuccess;
