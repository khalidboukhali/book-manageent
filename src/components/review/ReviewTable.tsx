import { BsTrashFill, BsPencilFill } from "react-icons/bs";
import Review from '../../models/Review'
import "../../assets/Table.css";

interface TableProps {
  reviews: Review[];
  deleteReview: (id: number) => void;
  editReview: (id: number) => void;
}

export const ReviewTable: React.FC<TableProps> = ({ reviews, deleteReview, editReview }) => {
  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>User name</th>
            <th>Book name</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => {
            return (
              <tr key={review.id}>
                <td>{review.userName}</td>
                <td>{review.bookName}</td>
                <td>{review.comment}</td>
                <td className="fit">
                  <span className="actions">
                    <BsTrashFill
                      className="delete-btn"
                      onClick={() => deleteReview(review.id)}
                    />
                    <BsPencilFill
                      className="edit-btn"
                      onClick={() => editReview(review.id)}
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

