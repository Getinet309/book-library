import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('q'); // 'q' is for general query

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchBy);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={handleInputChange}
      />
      <select value={searchBy} onChange={handleSearchByChange}>
        <option value="q">General</option>
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="subject">Subject</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;