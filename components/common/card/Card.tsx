import React from "react";

const Card: React.FC = ({ children }) => (
  <div className="p-3 rounded shadow-lg bg-white">{children}</div>
);

export default Card;
