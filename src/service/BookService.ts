import {booksInstance} from '../service/ApiProvider'
import Book from '../models/Book'


const BookService = {
  
  getAllBooks: async () => {
    try {
        const response = await booksInstance.get('');
        return response.data;
    } catch (error) {
        console.log("Error: "+error);
    }
  },

  
  getBookById: async (bookId: number)=> {
    const response = await booksInstance.get(`/${bookId}`);
    return response.data.data;
  },

  
  createBook: async (newBook: Omit<Book, 'id'>) => {
    await booksInstance.post('', newBook);
  },

  
  updateBook: async (bookId: number, updatedBook: Book)=> {
    await booksInstance.put(`/${bookId}`, updatedBook);
  },

  
  deleteBook: async (bookId: number)=> {
    await booksInstance.delete(`/${bookId}`);
  },
};

export default BookService;
