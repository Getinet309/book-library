// src/App.js

import React, { useState, useEffect, useCallback } from 'react';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import LoginModal from './components/LoginModal';
import RegistrationModal from './components/RegistrationModal';
import Pagination from './components/Pagination';
import { SkeletonGrid } from './components/BookCardSkeleton';
import SearchBar from './components/SearchBar';
import './App.css';

// Get initial favorites from localStorage
const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem('bookFavorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const [searchTerm, setSearchTerm] = useState('ethiopian history');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortOption, setSortOption] = useState('relevance');

  const [favorites, setFavorites] = useState(getInitialFavorites);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bookFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchBooks = useCallback(async () => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&page=${currentPage}&sort=${sortOption}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setBooks(data.docs);
      setTotalResults(data.numFound);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, sortOption]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (query) => {
    setSelectedBook(null);
    setSearchTerm(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleToggleFavorite = (bookKey) => {
    setFavorites((prev) => 
      prev.includes(bookKey) 
        ? prev.filter((key) => key !== bookKey)
        : [...prev, bookKey]
    );
  };
  
  // ... other handlers for login, registration, etc. ...
  const handleSelectBook = (book) => setSelectedBook(book);
  const handleBack = () => setSelectedBook(null);
  const handleLogin = () => { setIsLoginModalOpen(false); };
  const handleRegister = () => { setIsRegisterModalOpen(false); alert('Registration successful!'); };


  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📚 Book Library</h1>
          <nav className="header-nav">
            <SearchBar onSearch={handleSearch} />
            {/* START - Add Login and Register buttons here */}
            <button className="nav-button" onClick={() => setIsLoginModalOpen(true)}>Login</button>
            <button className="nav-button" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
            {/* END - Add Login and Register buttons here */}
            <button className="cart-button"> {/* This can be repurposed for favorites later */}
              ❤<span className="cart-badge">{favorites.length}</span>
            </button>
          </nav>
        </div>
        <div className="sub-header">
          <div className="sort-container">
            <label htmlFor="sort">Sort by: </label>
            <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="title">Title</option>
              <option value="first_publish_year">Publish Year</option>
            </select>
          </div>
        </div>
      </header>
      
      <main className="app-main">
        {error && <p className="status-text error-text">Error: {error}</p>}
        {loading && <SkeletonGrid />}
        {!loading && !error && (
          <>
            {selectedBook ? (
              <BookDetails book={selectedBook} onBack={handleBack} />
            ) : (
              books.length > 0 ? (
                <>
                  <BookList 
                    books={books} 
                    onSelectBook={handleSelectBook} 
                    favorites={favorites}
                    onToggleFavorite={handleToggleFavorite}
                  />
                  <Pagination 
                    currentPage={currentPage} 
                    totalResults={totalResults}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <p className="status-text">No books found. Try a different search!</p>
              )
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />
      <RegistrationModal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)} onRegister={handleRegister} />
    </div>
  );
};

export default App;