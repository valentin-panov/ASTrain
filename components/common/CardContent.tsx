import React from "react";

interface ICardContent {
  title: string;
  body: string;
}

const CardContent: React.FC<ICardContent> = ({ title, body }) => (
  <>
    <p className="font-bold text-gray-800 text-lg mb-3">{title}</p>
    <p className="text-gray-700 text-sm">{body}</p>
  </>
);

export default CardContent;
