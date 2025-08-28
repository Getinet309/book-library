// src/components/BookList.js

import React from 'react';
import './BookList.css'; // We'll create this new CSS file

const BookList = ({ books, onSelectBook }) => {
  // Fallback image for books without a cover
  const fallbackCover = 'https://via.placeholder.com/200x300.png?text=No+Cover';

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div 
          key={book.key} 
          className="book-card" 
          onClick={() => onSelectBook(book)}
        >
          <img
            src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : fallbackCover}
            alt={book.title}
            className="book-cover"
          />
          <div className="book-info">
            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author_name?.[0]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;