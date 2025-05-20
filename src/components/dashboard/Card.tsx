import React from 'react';

interface CardProps {
  title: string;
  value: number | string;
  percentage: number;
//   icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, percentage }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex items-center justify-between">
      <div>
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-2xl font-semibold">Rs,{value}</p>
        <p className={`text-sm ${percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {percentage >= 0 ? '+' : ''}{percentage}%
        </p>
      </div>
      {/* <div className="text-3xl">{icon}</div> */}
    </div>
  );
};

export default Card;
