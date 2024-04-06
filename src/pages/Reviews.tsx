// Reviews.tsx

import { useState, useEffect } from "react";
import { ReviewForm } from "../components/review/ReviewForm";
import { ReviewTable } from "../components/review/ReviewTable";
import reviewService from "../service/ReviewService";
import userService from "../service/UserService";
import bookService from "../service/BookService";
import Review from "../models/Review";
import User from "../models/User";
import Book from "../models/Book";
import "../assets/Table.css";
import ReviewFormData from "../models/ReviewFormData";

function Reviews() {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewToEdit, setReviewToEdit] = useState<number>(0);
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    userId: "",
    bookId: "",
    comment: "",
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

        const fetchedReviews = await reviewService.getAllReviews();
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEditReview = (reviewId: number) => {
    setReviewToEdit(reviewId);
    setFormOpen(true);

    // Find the review to edit from the reviews array
    const reviewToEdit = reviews.find((review) => review.id === reviewId);

    // If reviewToEdit is found, set the reviewFormData state
    if (reviewToEdit) {
      setReviewFormData({
        userId: String(reviewToEdit.userId),
        bookId: String(reviewToEdit.bookId),
        comment: reviewToEdit.comment,
      });
    }
  };

  const handleSubmit = async (newReview: ReviewFormData) => {
    try {
      if (reviewToEdit !== 0) {
        // If reviewToEdit is not 0, it means we're editing an existing review
        await reviewService.updateReview(
          reviewToEdit,
          Number(newReview.userId),
          Number(newReview.bookId),
          newReview.comment
        );
      } else {
        // If reviewToEdit is 0, it means we're creating a new review
        await reviewService.createReview(
          Number(newReview.userId),
          Number(newReview.bookId),
          newReview.comment
        );
      }

      setFormOpen(false);
      setReviewToEdit(0);

      const fetchedReviews = await reviewService.getAllReviews();
      setReviews(fetchedReviews);

      // Reset the reviewFormData state to its initial empty values
      setReviewFormData({
        userId: "",
        bookId: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="App">
      <h1 className="review-list-title">Reviews list:</h1>
      <ReviewTable
        reviews={reviews}
        deleteReview={handleDeleteReview}
        editReview={handleEditReview}
      />
      <button onClick={() => setFormOpen(true)} className="btn">
        Add Review
      </button>
      {formOpen && (
        <ReviewForm
          closeModal={() => {
            setFormOpen(false);
            setReviewToEdit(0);
            // Reset the reviewFormData state to its initial empty values
            setReviewFormData({
              userId: "",
              bookId: "",
              comment: "",
            });
          }}
          onSubmit={handleSubmit}
          users={users}
          books={books}
          defaultValue={reviewFormData} // Pass defaultValue
        />
      )}
    </div>
  );
}

export default Reviews;
