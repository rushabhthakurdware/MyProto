import React from 'react';

const Button = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${className}`}
  >
    {children}
  </button>
);

export default Button;
