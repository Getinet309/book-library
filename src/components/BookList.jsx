// src/components/BookList.jsx
import React from 'react';

const BookList = ({ books, onSelectBook }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {books.map((book) => (
        <div
          key={book.key}
          onClick={() => onSelectBook(book)}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            {/* You can add more details like first publish year here */}
            {book.first_publish_year && (
              <p className="text-xs text-gray-500 mt-2">
                Published: {book.first_publish_year}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;