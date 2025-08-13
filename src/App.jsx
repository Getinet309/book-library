import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  
  // This state is just to trigger the initial search for a default term
  const [searchTerm, setSearchTerm] = useState('the lord of the rings');

  useEffect(() => {
    if (!searchTerm) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      setBooks([]); // Clear previous results
      try {
        // We can search by title or a general query 'q'
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
  }, [searchTerm]); // Re-run effect when searchTerm changes

  // Fetch more details for the selected book (optional but good for UX)
  // This is a more advanced pattern you can add later.
  // For now, the details view will use the data from the initial search.

  const handleSearch = (query) => {
    setSelectedBook(null); // Go back to list view on a new search
    setSearchTerm(query);
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };
  
  const handleBack = () => {
    setSelectedBook(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-extrabold text-center my-6 text-gray-800">📚 Book Library</h1>
      
      {!selectedBook && <SearchBar onSearch={handleSearch} />}
      
      <main>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            {selectedBook ? (
              <BookDetails book={selectedBook} onBack={handleBack} />
            ) : (
              books.length > 0 ? (
                <BookList books={books} onSelectBook={handleSelectBook} />
              ) : (
                <p className="text-center">No books found. Try a different search!</p>
              )
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
