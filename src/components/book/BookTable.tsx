import { BsTrashFill, BsPencilFill } from "react-icons/bs";

import Book from '../../models/Book'
import "../../assets/Table.css";

interface TableProps {
  books: Book[];
  deleteBook: (id: number) => void;
  editBook: (id: number) => void;
}

export const BookTable: React.FC<TableProps> = ({ books, deleteBook, editBook }) => {

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td className="fit">
                  <span className="actions">
                    <BsTrashFill
                      className="delete-btn"
                      onClick={() => deleteBook(book.id)}
                    />
                    <BsPencilFill
                      className="edit-btn"
                      onClick={() => editBook(book.id)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

