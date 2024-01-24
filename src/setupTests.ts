// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { useAddBook, useEditBook, useFetchBooks } from './services/api';

jest.mock('swr')

jest.mock("axios", () => ({
    get: jest.fn(),
    post: jest.fn(),
}));
jest.mock("./services/api");

jest.mock('./context/SnackbarContext', () => ({
    ...jest.requireActual('./context/SnackbarContext'),
    useSnackbar: () => ({ openSnackbar: jest.fn() }),
}));
export const mockFunction = jest.fn();
export const mockBooks = [
    {
        id: 1,
        title: "Book 1",
        description: "Description 1",
        author: "Author 1",
        genre: "Genre 1",
    },
];