// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
   <form onSubmit={handleSubmit} className="flex items-center w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a book..."
        className="flex-grow p-2 sm:p-3 text-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 sm:p-3 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;