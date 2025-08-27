// src/components/Header.jsx
import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ onSearch }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      {/* This is the main Flexbox container for the entire header */}
      <div className="container mx-auto flex justify-between items-center">
        {/* Title */}
        <h1 className="text-xl font-bold">📚 Book Library</h1>

        {/* This div groups the search bar and buttons and aligns them */}
        <div className="flex items-center space-x-4">
          <SearchBar onSearch={onSearch} />

          {/* Login Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Login
          </button>

          {/* Cart Icon */}
          <button className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m4 8v.17c0 1.25.9 2.29 2.15 2.5a2.5 2.5 0 004.7 0c1.25-.21 2.15-1.25 2.15-2.5V13m-6 4a2 2 0 11-4 0 2 2 0 014 0zm0 0h4a2 2 0 11-4 0zm8-4h4m-4-8H9a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2z"
              />
            </svg>
            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;