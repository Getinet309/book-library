import React from 'react';
import './BookList.css';

const BookList = ({ books, onSelectBook, favorites, onToggleFavorite }) => {
  const fallbackCover = 'https://via.placeholder.com/200x300.png?text=No+Cover';

  return (
    <div className="book-grid">
      {books.map((book) => {
        const isFavorite = favorites.includes(book.key);
        
        return (
          <div key={book.key} className="book-card">
            <div className="card-image-container" onClick={() => onSelectBook(book)}>
              <img
                src={book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : fallbackCover}
                alt={book.title}
                className="book-cover"
              />
            </div>
            <div className="book-info">
              <div>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author_name?.[0]}</p>
              </div>
              <button 
                className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(book.key);
                }}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                ❤
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;