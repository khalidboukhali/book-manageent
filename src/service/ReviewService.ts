import { reviewInstance } from './ApiProvider'


const ReviewService = {

    getAllReviews: async () => {
        try {
            const response = await reviewInstance.get('');
            return response.data;
        } catch (error) {
            console.log("Error: " + error);
        }
    },


    getReviewById: async (reviewId: number) => {
        const response = await reviewInstance.get(`/${reviewId}`);
        return response.data.data;
    },


    createReview: async (userId: number, bookId: number, reviewDescription: string) => {

        await reviewInstance.post('', null, {
            params: {
                userId: userId,
                bookId: bookId,
                reviewDescription: reviewDescription
            }
        });

    },



    updateReview: async (reviewId: number, userId: number, bookId: number, newComment: string) => {
        await reviewInstance.put(`/${reviewId}`, null, {
            params: {
                userId: userId,
                bookId: bookId,
                newComment: newComment
            }
        });
    },


    deleteReview: async (reviewId: number) => {
        await reviewInstance.delete(`/${reviewId}`);
    },
};

export default ReviewService;
