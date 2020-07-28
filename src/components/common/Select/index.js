import React from 'react';
import './Select.scss';

const Select = ({ value, onFilterValueChange }) => {
  return (
    <select className="filter-workflows" onChange={onFilterValueChange}>
      <option defaultValue value="all">
        ALL
      </option>
      <option value="completed">Completed</option>
      <option value="pending">Pending</option>
    </select>
  );
};

export default Select;
