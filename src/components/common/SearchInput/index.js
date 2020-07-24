import React, { useState } from 'react';
import './SearchInput.scss';

const SearchInput = ({ searchWorkflows }) => {
  const [searchInput, setSearchInput] = useState('');

  const onSearchInputChange = event => {
    const searchInput = event.target.value;
    setSearchInput(searchInput);
    searchWorkflows(searchInput);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        Search Workflows based on workflow name
      </div>
      <input
        type="text"
        placeholder="Search"
        className="search-input"
        value={searchInput}
        onChange={onSearchInputChange}
      />
    </div>
  );
};

export default SearchInput;
