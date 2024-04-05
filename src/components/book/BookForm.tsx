import { useState } from "react";
import "../../assets/Form.css";
import Book from "../../models/Book";

interface ModalProps {
  closeModal: () => void;
  onSubmit: (formData: Book) => void;
  defaultValue?: Book;
}

export const BookForm: React.FC<ModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
}) => {
  const [formState, setFormState] = useState<Book>(
    defaultValue || {
      id: 0,
      title: "",
      author: "",
      genre: ""
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.title &&
      formState.author &&
      formState.genre 
    ) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await onSubmit(formState);
      closeModal();
    } catch (error) {
      console.error("Error submitting room:", error);
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
        <form>
          <div className="form-group">
            <label htmlFor="title">Book title</label>
            <input
              name="title"
              onChange={handleChange}
              value={formState.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              name="author"
              onChange={handleChange}
              value={formState.author}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              name="genre"
              onChange={handleChange}
              value={formState.genre}
            />
          </div>
          
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" className="btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
