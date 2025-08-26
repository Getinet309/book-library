import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const [searchTerm, setSearchTerm] = useState('the lord of the rings');

  useEffect(() => {
    if (!searchTerm) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      setBooks([]);
      try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setBooks(data.docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const handleSearch = (query) => {
    setSelectedBook(null);
    setSearchTerm(query);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleBack = () => {
    setSelectedBook(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="bg-gray-800 text-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold">📚 Book Library</h1>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <SearchBar onSearch={handleSearch} />
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Login
            </button>
            <button className="relative p-2 rounded-full hover:bg-gray-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m4 8v.17c0 1.25.9 2.29 2.15 2.5a2.5 2.5 0 004.7 0c1.25-.21 2.15-1.25 2.15-2.5V13m-6 4a2 2 0 11-4 0 2 2 0 014 0zm0 0h4a2 2 0 11-4 0zm8-4h4m-4-8H9a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2z" />
              </svg>
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="min-h-screen">
        {loading && <p className="text-center text-xl text-gray-600">Loading...</p>}
        {error && <p className="text-center text-xl text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            {selectedBook ? (
              <BookDetails book={selectedBook} onBack={handleBack} />
            ) : (
              books.length > 0 ? (
                <BookList books={books} onSelectBook={handleSelectBook} />
              ) : (
                <p className="text-center text-xl text-gray-500">No books found. Try a different search!</p>
              )
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;