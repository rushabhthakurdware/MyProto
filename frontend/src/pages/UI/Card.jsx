import React from 'react';

const Card = ({ title, children, className = '' }) => (
  <div className={`bg-white p-6 rounded-xl shadow-md ${className}`}>
    {title && <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>}
    {children}
  </div>
);

export default Card;
