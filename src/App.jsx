// src/App.js

import React, { useState, useEffect } from 'react';
import Header from './components/Header'; // Assuming you have these from the start
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import LoginModal from './components/LoginModal';
import RegistrationModal from './components/RegistrationModal';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('ethiopian history'); // A good starting point for Gondar!

  // State for login and registration
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

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

  // Handlers for login flow
  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };
  const handleLogout = () => setIsLoggedIn(false);

  // Handlers for registration flow
  const handleRegister = () => {
    setIsRegisterModalOpen(false);
    alert('Registration successful! You can now log in.');
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
              <div className="auth-buttons">
                <button onClick={() => setIsLoginModalOpen(true)} className="login-button">
                  Login
                </button>
                <button onClick={() => setIsRegisterModalOpen(true)} className="register-button">
                  Register
                </button>
              </div>
            )}
            
            {/* *** FIX WAS HERE: The entire cart button was missing. It is now restored. *** */}
            <button className="cart-button">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H3m4 8v.17c0 1.25.9 2.29 2.15 2.5a2.5 2.5 0 004.7 0c1.25-.21 2.15-1.25 2.15-2.5V13m-6 4a2 2 0 11-4 0 2 2 0 014 0zm0 0h4a2 2 0 11-4 0zm8-4h4m-4-8H9a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2z" />
              </svg>
              <span className="cart-badge">0</span>
            </button>
          </nav>
        </div>
      </header>
      
      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <RegistrationModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} onRegister={handleRegister} />

      <main className="app-main">
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