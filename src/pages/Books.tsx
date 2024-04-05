import { useState, useEffect } from "react";
import {BookForm} from "../components/book/BookForm";
import {BookTable} from "../components/book/BookTable";
import bookService from '../service/BookService'

import Book from '../models/Book'
import '../assets/Table.css'

function Books() {
  const [formOpen, setFormOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookToEdit, setBookToEdit] = useState<number>(0);

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await bookService.getAllBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    // Fetch books when component mounts
    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId: number) => {
    try {
      await bookService.deleteBook(bookId);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditBook = (userId: number) => {
    setBookToEdit(userId);
    setFormOpen(true);
  };

  const handleSubmit = async (newBook: Book) => {
    try {
      if (bookToEdit === 0) {
        // Add new book
        await bookService.createBook(newBook);
        fetchBooks();
      } else {
        // Update existing book
        await bookService.updateBook(bookToEdit, newBook);
        fetchBooks();
      }
      setBookToEdit(0);
      setFormOpen(false);
    } catch (error) {
      console.error("Error submitting book:", error);
    }
  };

  return (
    <div>
      <div className="App">
        <h1 className="room-list-title">Books list:</h1>
        <BookTable
          books={books}
          deleteBook={handleDeleteBook}
          editBook={handleEditBook}
        />
        <button onClick={() => setFormOpen(true)} className="btn">
          Add new book
        </button>
        {formOpen && (
          <BookForm
            closeModal={() => {
              setFormOpen(false);
              setBookToEdit(0);
            }}
            onSubmit={handleSubmit}
            defaultValue={
              bookToEdit !== 0
                ? books.find((book) => book.id === bookToEdit)
                : undefined
            }
          />
        )}
      </div>
    </div>
  );
}

export default Books;
