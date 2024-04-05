import { useState } from "react";
import "../../assets/Form.css";
import User from "../../models/User";

interface ModalProps {
  closeModal: () => void;
  onSubmit: (formData: User) => void;
  defaultValue?: User;
}

export const UserForm: React.FC<ModalProps> = ({
  closeModal,
  onSubmit,
  defaultValue,
}) => {
  const [formState, setFormState] = useState<User>(
    defaultValue || {
      id:0,
      fullName: "",
      email: "",
      phone_number: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.fullName && formState.email && formState.phone_number) {
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
            <label htmlFor="fullName">Full name</label>
            <input
              name="fullName"
              onChange={handleChange}
              value={formState.fullName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              name="email"
              onChange={handleChange}
              value={formState.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">Phone number</label>
            <input
              name="phone_number"
              onChange={handleChange}
              value={formState.phone_number}
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
