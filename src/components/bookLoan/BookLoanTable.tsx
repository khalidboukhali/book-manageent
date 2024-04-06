// BookLoanTable.tsx
import { BsTrashFill, BsPencilFill } from "react-icons/bs";
import BookLoan from '../../models/BookLoan';
import "../../assets/Table.css";

interface TableProps {
  bookLoans: BookLoan[];
  deleteBookLoan: (id: number) => void;
  editBookLoan: (id: number) => void;
}

export const BookLoanTable: React.FC<TableProps> = ({ bookLoans, deleteBookLoan, editBookLoan }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>User name</th>
            <th>Book name</th>
            <th>Date Borrowed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookLoans.map((bookLoan) => (
            <tr key={bookLoan.id}>
              <td>{bookLoan.userName}</td>
              <td>{bookLoan.bookTitle}</td>
              <td>{bookLoan.dateBorrowed}</td>
              <td className="fit">
                <span className="actions">
                  <BsTrashFill
                    className="delete-btn"
                    onClick={() => deleteBookLoan(bookLoan.id)}
                  />
                  <BsPencilFill
                    className="edit-btn"
                    onClick={() => editBookLoan(bookLoan.id)}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
