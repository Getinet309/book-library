import React from 'react';

const BookCard = ({ book, onSelectBook }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : 'https://via.placeholder.com/150x220.png?text=No+Cover';

  return (
    <div
      className="border rounded-lg p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg transition"
      onClick={() => onSelectBook(book)}
    >
      <img src={coverUrl} alt={`${book.title} cover`} className="w-32 h-48 object-cover mb-4" />
      <h3 className="font-bold text-lg">{book.title}</h3>
      <p className="text-gray-600">{book.author_name?.join(', ')}</p>
    </div>
  );
};

export default BookCard;
