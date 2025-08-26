// src/components/BookDetails.jsx
import React from 'react';

const BookDetails = ({ book, onBack }) => {
  if (!book) {
    return null;
  }
  const coverUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null;

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-10 max-w-4xl mx-auto my-8">
      <button onClick={onBack} className="mb-6 text-gray-600 hover:text-gray-800 transition-colors duration-200">
        &larr; Back to Search Results
      </button>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            className="w-48 h-auto object-cover rounded-lg shadow-md flex-shrink-0"
          />
        ) : (
          <div className="w-48 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 flex-shrink-0">
            No Cover
          </div>
        )}

        <div className="flex flex-col space-y-4 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900">{book.title}</h2>
          <p className="text-lg text-gray-600">
            by <span className="font-semibold">{book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</span>
          </p>
          <div className="space-y-2 text-gray-700">
            {book.first_publish_year && (
              <p>
                <span className="font-semibold">First Published:</span> {book.first_publish_year}
              </p>
            )}
            {book.subject && (
              <p>
                <span className="font-semibold">Subjects:</span> {book.subject.slice(0, 5).join(', ')}
              </p>
            )}
            {/* Add more details here as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;