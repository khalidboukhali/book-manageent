import { useState, useEffect } from "react";
import {ReviewTable} from "../components/review/ReviewTable";
import reviewService from '../service/ReviewService'

import '../assets/Table.css'
import Review from "../models/Review";

function Books() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    try {
      const fetchedReviews = await reviewService.getAllReviews();
      setReviews(fetchedReviews);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    // Fetch books when component mounts
    fetchReviews();
  }, []);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleEditReview = () => {
  };

  return (
    <div>
      <div className="App">
        <h1 className="room-list-title">Reviews list:</h1>
        <ReviewTable
          reviews={reviews}
          deleteReview={handleDeleteReview}
          editReview={handleEditReview}
        />
        <button className="btn">
          Add new book
        </button>
      </div>
    </div>
  );
}

export default Books;
