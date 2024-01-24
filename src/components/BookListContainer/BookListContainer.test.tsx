import { render, screen, waitFor } from "@testing-library/react";
import {
  useAddBook,
  useDeleteBook,
  useEditBook,
  useFetchBooks,
} from "../../services/api";
import BookListContainer from "./BookListContainer";

describe("BookListContainer", () => {
  const mockFunction = jest.fn();
  (useDeleteBook as jest.Mock).mockReturnValue({
    deleteBook: mockFunction,
  });
  (useAddBook as jest.Mock).mockReturnValue({
    addBook: mockFunction,
  });
  (useEditBook as jest.Mock).mockReturnValue({
    editBook: mockFunction,
  });
  it("renders loading state initially", async () => {
    (useFetchBooks as jest.Mock).mockReturnValue({
      books: [],
      isLoading: true,
      isError: false,
      mutate: jest.fn(),
    });

    render(<BookListContainer />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state when there's an error", async () => {
    (useFetchBooks as jest.Mock).mockReturnValue({
      books: [],
      isLoading: false,
      isError: true,
      mutate: jest.fn(),
    });

    render(<BookListContainer />);

    expect(screen.getByText(/error loading books/i)).toBeInTheDocument();
  });

  it("renders BookList component with books", async () => {
    const mockBooks = [
      { id: 1, title: "Book 1" },
      { id: 2, title: "Book 2" },
    ];

    (useFetchBooks as jest.Mock).mockReturnValue({
      books: mockBooks,
      isLoading: false,
      isError: false,
      mutate: jest.fn(),
    });
    const mockFunction = jest.fn();
    (useDeleteBook as jest.Mock).mockReturnValue({
      deleteBook: mockFunction,
    });
    (useAddBook as jest.Mock).mockReturnValue({
      addBook: mockFunction,
    });
    (useEditBook as jest.Mock).mockReturnValue({
      editBoook: mockFunction,
    });

    render(<BookListContainer />);

    await waitFor(() => {
      expect(screen.getByTestId("book-list")).toBeInTheDocument();
      mockBooks.forEach((book) => {
        expect(screen.getByText(book.title)).toBeInTheDocument();
      });
    });
  });
});
