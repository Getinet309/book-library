// src/components/BookList.jsx
import React from 'react';

const BookList = ({ books, onSelectBook, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {books.map((book) => (
        <div
          key={book.key}
          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
        >
          {/* Card content - can be clickable for details */}
          <div className="cursor-pointer" onClick={() => onSelectBook(book)}>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                {book.title}
              </h2>
              <p className="text-sm text-gray-600">
                by {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
              </p>
            </div>
          </div>
          
          {/* Add to Cart button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => onAddToCart(book)}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;