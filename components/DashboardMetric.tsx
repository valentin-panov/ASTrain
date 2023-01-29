import React from "react";

export interface IDashboardMetric {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardMetric: React.FC<IDashboardMetric> = ({
  title,
  value,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-t-4 border-blue-500">
      <p className="text-gray-600 uppercase text-xs">
        {icon}
        {title}
      </p>
      <p className="text-3xl text-blue-600 font-bold">{value}</p>
    </div>
  );
};

export default DashboardMetric;
