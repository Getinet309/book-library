import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

// New: BillingPage component for demonstration
const BillingPage = ({ cart, onRemoveFromCart, onCheckout }) => {
  const total = cart.reduce((sum, book) => sum + 10, 0); // Assuming a flat rate of $10 per book

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-300 mb-4">
            {cart.map((book, index) => (
              <li key={index} className="flex justify-between items-center py-2">
                <span className="font-semibold">{book.title}</span>
                <div className="flex items-center">
                  <span className="text-green-600 mr-4">$10.00</span>
                  <button
                    onClick={() => onRemoveFromCart(book)}
                    className="text-red-500 hover:text-red-700 font-bold"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right font-bold text-2xl mb-4">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={onCheckout}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('the lord of the rings');
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!searchTerm) return;
    if (currentPage !== 'home') return;

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
  }, [searchTerm, currentPage]);

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

  // Billing System Functions
  const handleAddToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
    alert(`${book.title} added to cart!`);
  };

  const handleRemoveFromCart = (bookToRemove) => {
    setCart((prevCart) => prevCart.filter((book) => book.key !== bookToRemove.key));
  };

  const handleCheckout = () => {
    setCart([]);
    alert('Checkout successful! Your cart has been cleared.');
    setCurrentPage('home');
  };

  return (
    <div className="container mx-auto p-4">
      {/* New: Navigation Bar */}
      <nav className="flex justify-between items-center py-4 px-6 bg-gray-800 text-white rounded-lg mb-6">
        <h1 className="text-3xl font-extrabold cursor-pointer" onClick={() => setCurrentPage('home')}>
          📚 Book Library
        </h1>
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`font-semibold transition-colors ${currentPage === 'home' ? 'text-green-400' : 'hover:text-gray-300'}`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentPage('billing')}
            className={`font-semibold transition-colors ${currentPage === 'billing' ? 'text-green-400' : 'hover:text-gray-300'}`}
          >
            Billing ({cart.length})
          </button>
        </div>
      </nav>

      <main>
        {currentPage === 'home' ? (
          <>
            {!selectedBook && <SearchBar onSearch={handleSearch} />}
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}
            {!loading && !error && (
              <>
                {selectedBook ? (
                  <BookDetails book={selectedBook} onBack={handleBack} onAddToCart={handleAddToCart} />
                ) : (
                  books.length > 0 ? (
                    <BookList books={books} onSelectBook={handleSelectBook} />
                  ) : (
                    <p className="text-center">No books found. Try a different search!</p>
                  )
                )}
              </>
            )}
          </>
        ) : (
          <BillingPage
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={handleCheckout}
          />
        )}
      </main>
    </div>
  );
};

export default App;