import React from "react";

interface ILabel {
  text: string;
}

const Label: React.FC<ILabel> = ({ text }) => (
  <label className="text-sm font-semibold text-gray-700">{text}</label>
);

export default Label;
