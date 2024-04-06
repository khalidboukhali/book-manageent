// ReviewForm.tsx
import { useState, useEffect } from "react";
import "../../assets/Form.css";
import Book from "../../models/Book";
import User from "../../models/User";
import ReviewFormData from "../../models/ReviewFormData";

interface ModalProps {
  closeModal: () => void;
  onSubmit: (formData: ReviewFormData) => void;
  defaultValue?: ReviewFormData;
  users: User[];
  books: Book[];
}

export const ReviewForm: React.FC<ModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
  users,
  books,
}) => {
  const [formState, setFormState] = useState<ReviewFormData>(() => {
    if (defaultValue) {
      return defaultValue;
    } else {
      return {
        userId: "",
        bookId: "",
        comment: "",
      };
    }
  });

  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setFormState(defaultValue);
    }
  }, [defaultValue]);

  const validateForm = () => {
    if (formState.userId && formState.bookId && formState.comment) {
      setErrors("");
      return true;
    } else {
      setErrors("Please fill out all fields.");
      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formState);
      closeModal();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if ((e.target as HTMLElement).className === "modal-container")
          closeModal();
      }}
    >
      <div className="modal">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">Select User</label>
            <select
              name="userId"
              onChange={handleChange}
              value={formState.userId}
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="bookId">Select Book</label>
            <select
              name="bookId"
              onChange={handleChange}
              value={formState.bookId}
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment</label>
            <textarea
              name="comment"
              onChange={handleChange}
              value={formState.comment}
            />
          </div>

          {errors && <div className="error">{errors}</div>}
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
