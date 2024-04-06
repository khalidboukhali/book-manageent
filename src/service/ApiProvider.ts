import axios from 'axios';
import { baseURL } from '../core/constants';

export const usersInstance = axios.create({
    baseURL: `${baseURL}/users`
});

export const booksInstance = axios.create({
    baseURL: `${baseURL}/books`
});

export const reviewInstance = axios.create({
    baseURL: `${baseURL}/reviews`
});

export const bookLoanInstance = axios.create({
    baseURL: `${baseURL}/book-loans`
});