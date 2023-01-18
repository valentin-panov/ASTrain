import React from "react";

interface IPageTitle {
  title: string;
}

const PageTitle: React.FC<IPageTitle> = ({ title }) => (
  <div className="my-1 sm:my-4">
    <h2 className="text-gray-800 font-bold text-2xl">{title}</h2>
  </div>
);

export default PageTitle;
