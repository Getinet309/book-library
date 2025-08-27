import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import LoginModal from './components/LoginModal'; // Import the modal
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('the lord of the rings');

  // New state for login functionality
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // ... (your existing useEffect code remains unchanged)
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

  // Handlers for login flow
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📚 Book Library</h1>
          <nav className="header-nav">
            <SearchBar onSearch={handleSearch} />
            {isLoggedIn ? (
              <button onClick={handleLogout} className="login-button">
                Logout
              </button>
            ) : (
              <button onClick={() => setIsModalOpen(true)} className="login-button">
                Login
              </button>
            )}
            <button className="cart-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m4 8v.17c0 1.25.9 2.29 2.15 2.5a2.5 2.5 0 004.7 0c1.25-.21 2.15-1.25 2.15-2.5V13m-6 4a2 2 0 11-4 0 2 2 0 014 0zm0 0h4a2 2 0 11-4 0zm8-4h4m-4-8H9a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2z" />
              </svg>
              <span className="cart-badge">0</span>
            </button>
          </nav>
        </div>
      </header>
      
      {/* Render the Login Modal */}
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={handleLogin} />

      <main className="app-main">
        {/* ... (your existing main content remains unchanged) */}
        {loading && <p className="status-text">Loading...</p>}
        {error && <p className="status-text error-text">Error: {error}</p>}
        {!loading && !error && (
          <>
            {selectedBook ? (
              <BookDetails book={selectedBook} onBack={handleBack} />
            ) : (
              books.length > 0 ? (
                <BookList books={books} onSelectBook={handleSelectBook} />
              ) : (
                <p className="status-text">No books found. Try a different search!</p>
              )
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;