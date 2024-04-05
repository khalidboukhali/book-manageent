import {reviewInstance} from './ApiProvider'
import Review from '../models/Review'


const ReviewService = {
  
  getAllReviews: async () => {
    try {
        const response = await reviewInstance.get('');
        return response.data;
    } catch (error) {
        console.log("Error: "+error);
    }
  },

  
  getReviewById: async (reviewId: number)=> {
    const response = await reviewInstance.get(`/${reviewId}`);
    return response.data.data;
  },

  
  createReview: async (newBook: Omit<Review, 'id'>) => {
    await reviewInstance.post('', newBook);
  },

  
  updateReview: async (bookId: number, updatedReview: Review)=> {
    await reviewInstance.put(`/${bookId}`, updatedReview);
  },

  
  deleteReview: async (reviewId: number)=> {
    await reviewInstance.delete(`/${reviewId}`);
  },
};

export default ReviewService;
