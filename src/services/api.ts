import useSWR from 'swr';
import axios from 'axios';
import { BookToAdd } from '../types/types';

export const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

export const useFetchBooks = () => {
    const { data, error, mutate } = useSWR('/books', async () => {
        const response = await axios.get(`${BASE_URL}/books`);
        return response.data;
    });

    return { books: data, isLoading: !error && !data, isError: error, mutate };
};

export const useAddBook = () => {
    const { mutate } = useSWR('/books');

    const addBook = async (newBook: BookToAdd) => {
        try {
            await axios.post(`${BASE_URL}/books`, newBook);
            mutate();
        } catch (error) {
            console.error('Error adding book:', error);
            throw new Error('Failed to add the book. Please try again.');
        }
    };

    return { addBook };
};

export const useEditBook = () => {
    const { mutate } = useSWR('/books');

    const editBook = async (bookId: number, updatedBook: BookToAdd) => {
        try {
            await axios.put(`${BASE_URL}/books/${bookId}`, updatedBook);
            mutate();
        } catch (error) {
            console.error('Error updating book:', error);
            throw new Error('Failed to update the book. Please try again.');
        }
    };

    return { editBook };
};

export const useDeleteBook = () => {
    const { mutate } = useSWR('/books');

    const deleteBook = async (bookId: number) => {
        try {
            await axios.delete(`${BASE_URL}/books/${bookId}`);
            mutate();
        } catch (error) {
            console.error('Error deleting book:', error);
            throw new Error('Failed to delete the book. Please try again.');
        }
    };

    return { deleteBook };
};
