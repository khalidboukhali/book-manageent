// BookLoan.tsx
import { useState, useEffect } from "react";
import { BookLoanForm } from "../components/bookLoan/BookLoanForm";
import { BookLoanTable } from "../components/bookLoan/BookLoanTable";
import bookLoanService from "../service/BookLoanService";
import userService from "../service/UserService";
import bookService from "../service/BookService";
import BookLoan from "../models/BookLoan";
import User from "../models/User";
import Book from "../models/Book";
import "../assets/Table.css";
import BookLoanFormData from "../models/BookLoanFormData";

const BookLoans = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [bookLoans, setBookLoans] = useState<BookLoan[]>([]);
  const [bookLoanToEdit, setBookLoanToEdit] = useState<number>(0);
  const [bookLoanFormData, setBookLoanFormData] = useState<BookLoanFormData>({
    userId: "",
    bookId: "",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedUsers = await userService.getAllUsers();
        setUsers(fetchedUsers);

        const fetchedBooks = await bookService.getAllBooks();
        setBooks(fetchedBooks);

        const fetchedBookLoans = await bookLoanService.getAllBookLoans();
        setBookLoans(fetchedBookLoans);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteBookLoan = async (bookLoanId: number) => {
    try {
      await bookLoanService.removeBookLoan(bookLoanId);
      setBookLoans(bookLoans.filter((bookLoan) => bookLoan.id !== bookLoanId));
    } catch (error) {
      console.error("Error deleting book loan:", error);
    }
  };

  const handleEditBookLoan = (bookLoanId: number) => {
    setBookLoanToEdit(bookLoanId);
    setFormOpen(true);

    // Find the book loan to edit from the book loans array
    const bookLoanToEdit = bookLoans.find((bookLoan) => bookLoan.id === bookLoanId);

    // If bookLoanToEdit is found, set the bookLoanFormData state
    if (bookLoanToEdit) {
      setBookLoanFormData({
        userId: String(bookLoanToEdit.userId),
        bookId: String(bookLoanToEdit.bookId),
      });
    }
  };

  const handleSubmit = async (newBookLoan: BookLoanFormData) => {
    try {
      if (bookLoanToEdit !== 0) {
        // If bookLoanToEdit is not 0, it means we're editing an existing book loan
        await bookLoanService.updateBookLoan(
          bookLoanToEdit,
          Number(newBookLoan.userId),
          Number(newBookLoan.bookId)
        );
      } else {
        // If bookLoanToEdit is 0, it means we're creating a new book loan
        await bookLoanService.addBookLoan(
          Number(newBookLoan.userId),
          Number(newBookLoan.bookId)
        );
      }

      setFormOpen(false);
      setBookLoanToEdit(0);

      const fetchedBookLoans = await bookLoanService.getAllBookLoans();
      setBookLoans(fetchedBookLoans);

      // Reset the bookLoanFormData state to its initial empty values
      setBookLoanFormData({
        userId: "",
        bookId: "",
      });
    } catch (error) {
      console.error("Error submitting book loan:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="book-loan-list-title">Book Loans list:</h1>
      <BookLoanTable
        bookLoans={bookLoans}
        deleteBookLoan={handleDeleteBookLoan}
        editBookLoan={handleEditBookLoan}
      />
      <button onClick={() => setFormOpen(true)} className="btn">
        Add Book Loan
      </button>
      {formOpen && (
        <BookLoanForm
          closeModal={() => {
            setFormOpen(false);
            setBookLoanToEdit(0);
            // Reset the bookLoanFormData state to its initial empty values
            setBookLoanFormData({
              userId: "",
              bookId: "",
            });
          }}
          onSubmit={handleSubmit}
          users={users}
          books={books}
          defaultValue={bookLoanFormData}
        />
      )}
    </div>
  );
}

export default BookLoans;
