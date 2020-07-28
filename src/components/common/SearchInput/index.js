import React, { useState } from 'react';
import './SearchInput.scss';

const SearchInput = ({ value, onSearchValueChange }) => {
  return (
    <div className="search-container">
      <div className="search-header">
        Search Workflows based on workflow name
      </div>
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={value}
        onChange={onSearchValueChange}
      />
    </div>
  );
};

export default SearchInput;
