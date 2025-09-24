import React from 'react';

const Select = ({ options, placeholder, onChange }) => (
  <select
    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
    onChange={onChange}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.id} value={option.id}>
        {option.name} ({option.students} students)
      </option>
    ))}
  </select>
);

export default Select;
