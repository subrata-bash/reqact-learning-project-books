import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const deletBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatetdBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatetdBooks);
  };

  const createBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    const updatedBooks = [...books, response.data];

    setBooks(updatedBooks);
  };
  return (
    <div className="app">
      <h1>Raeding List</h1>
      <BookList onEdit={editBookById} books={books} onDelete={deletBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
