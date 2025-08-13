import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onSelectBook }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onSelectBook={onSelectBook} />
      ))}
    </div>
  );
};

export default BookList;
