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
  const [searchBy, setSearchBy] = useState('q'); // New state for search criteria
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortOption, setSortOption] = useState('relevance');

  const [favorites, setFavorites] = useState(getInitialFavorites);
  const [showFavorites, setShowFavorites] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      const url = `https://openlibrary.org/search.json?${searchBy}=${searchTerm}&page=${currentPage}&sort=${sortOption}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setBooks(data.docs);
      setTotalResults(data.numFound);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, searchBy, currentPage, sortOption]);

  useEffect(() => {
    if (isLoggedIn && !showFavorites) {
      fetchBooks();
    } else if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, [fetchBooks, showFavorites, isLoggedIn]);

  const handleSearch = (query, searchByOption) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setSelectedBook(null);
    setShowFavorites(false);
    setSearchTerm(query);
    setSearchBy(searchByOption);
    setCurrentPage(1);
  };

  const handleToggleFavorite = (bookKey) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setFavorites((prev) =>
      prev.includes(bookKey)
        ? prev.filter((key) => key !== bookKey)
        : [...prev, bookKey]
    );
  };

  const handleShowFavorites = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setShowFavorites(true);
    setSelectedBook(null);
  };

  const handleSelectBook = (book) => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }
    setSelectedBook(book);
  };

  const handleBack = () => {
    if (selectedBook) {
      setSelectedBook(null);
    } else {
      setShowFavorites(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowFavorites(false);
    setSelectedBook(null);
    setBooks([]);
    setIsLoginModalOpen(true);
  };

  const handleRegister = () => {
    setIsRegisterModalOpen(false);
    alert('Registration successful! Please log in.');
  };

  const favoriteBooks = books.filter(book => favorites.includes(book.key));

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">📚 Book Library</h1>
          <nav className="header-nav">
            {isLoggedIn && <SearchBar onSearch={handleSearch} />}
            {isLoggedIn ? (
              <>
                <button className="nav-button" onClick={handleLogout}>Logout</button>
                <button className="cart-button" onClick={handleShowFavorites}>
                  ❤<span className="cart-badge">{favorites.length}</span>
                </button>
              </>
            ) : (
              <>
                <button className="nav-button" onClick={() => setIsLoginModalOpen(true)}>Login</button>
                <button className="nav-button" onClick={() => setIsRegisterModalOpen(true)}>Register</button>
              </>
            )}
          </nav>
        </div>
        {isLoggedIn && (
          <div className="sub-header">
            <div className="sort-container">
              <label htmlFor="sort">Sort by: </label>
              <select id="sort" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="title">Title</option>
                <option value="old">Publish Year (Oldest First)</option>
                <option value="new">Publish Year (Newest First)</option>
                <option value="author">Writer</option>
              </select>
            </div>
          </div>
        )}
      </header>

      <main className="app-main">
        {!isLoggedIn ? (
          <p className="status-text">Please log in to view the book library. 📖</p>
        ) : (
          <>
            {error && <p className="status-text error-text">Error: {error}</p>}
            {loading && <SkeletonGrid />}
            {!loading && !error && (
              <>
                {selectedBook ? (
                  <BookDetails book={selectedBook} onBack={handleBack} />
                ) : showFavorites ? (
                  <>
                    <button onClick={handleBack} className="back-button">← Back to Search</button>
                    <h2>My Favorites</h2>
                    {favoriteBooks.length > 0 ? (
                      <BookList
                        books={favoriteBooks}
                        onSelectBook={handleSelectBook}
                        favorites={favorites}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ) : (
                      <p className="status-text">You have no favorite books yet.</p>
                    )}
                  </>
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