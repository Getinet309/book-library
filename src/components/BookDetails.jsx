import React from 'react';

const BookDetails = ({ book, onBack }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/300x450.png?text=No+Cover';

  return (
    <div className="p-8">
      <button onClick={onBack} className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
        ← Back to Search Results
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={coverUrl} alt={`${book.title} cover`} className="w-1/2 md:w-1/4 object-contain self-center" />
        <div>
          <h2 className="text-4xl font-bold mb-2">{book.title}</h2>
          <p className="text-xl text-gray-700 mb-4">by {book.author_name?.join(', ')}</p>
          <p className="mb-2"><strong>First Published:</strong> {book.first_publish_year}</p>
          <p className="mb-4"><strong>Publisher:</strong> {book.publisher?.join(', ')}</p>
          <div className="prose max-w-none">
            <p>
              {book.description || 'No description available for this book.'}
            </p>
          </div>
          <p className="mt-4"><strong>Subjects:</strong> {book.subject?.slice(0, 5).join(', ')}</p>
          <p className="mt-2"><strong>ISBN:</strong> {book.isbn?.[0]}</p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
