import { fireEvent, render, screen } from "@testing-library/react";
import {
  useAddBook,
  useDeleteBook,
  useEditBook,
  useFetchBooks,
} from "../../services/api";
import { BookList } from "./BookList";
import { mockBooks, mockFunction } from "../../setupTests";

describe("BookList", () => {
  it("renders book list with edit & delete button and opens modal or deletes the entry", async () => {
    (useFetchBooks as jest.Mock).mockReturnValue({
      books: mockBooks,
      isLoading: false,
      isError: false,
      mutate: jest.fn(),
    });

    (useDeleteBook as jest.Mock).mockReturnValue({
      deleteBook: mockFunction,
    });
    (useAddBook as jest.Mock).mockReturnValue({
      addBook: mockFunction,
    });
    (useEditBook as jest.Mock).mockReturnValue({
      editBook: mockFunction,
    });
    render(<BookList books={mockBooks} />);
    expect(screen.queryByTestId("book-form-modal")).not.toBeInTheDocument();
    fireEvent.click(screen.getByText("Edit"));
    expect(screen.getByTestId("book-form-modal")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close"));
    fireEvent.click(screen.getByText("Delete"));
    expect(mockFunction).toHaveBeenCalledWith(mockBooks[0].id);
  });
});
