import React from "react";

interface IDangerButton {
  text: string;
  onClick: () => void;
}

const DangerButton: React.FC<IDangerButton> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="text-red-600 text-sm rounded border border-red-600 px-2 hover:text-white hover:bg-red-600"
  >
    {text}
  </button>
);

export default DangerButton;
