import { bookLoanInstance } from './ApiProvider';

const BookLoanService = {
  getAllBookLoans: async () => {
    try {
      const response = await bookLoanInstance.get('');
      return response.data;
    } catch (error) {
      console.log("Error: " + error);
    }
  },

  getBookLoanById: async (bookLoanId: number) => {
    const response = await bookLoanInstance.get(`/${bookLoanId}`);
    return response.data.data;
  },

  addBookLoan: async (userId: number, bookId: number) => {
    await bookLoanInstance.post('', null, {
      params: {
        userId: userId,
        bookId: bookId
      }
    });
  },

  updateBookLoan: async (bookLoanId: number, userId: number, bookId: number) => {
    await bookLoanInstance.put(`/${bookLoanId}`, null, {
      params: {
        newUserId: userId,
        newBookId: bookId
      }
    });
  },

  removeBookLoan: async (bookLoanId: number) => {
    await bookLoanInstance.delete(`/${bookLoanId}`);
  }
};

export default BookLoanService;
