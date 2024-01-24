import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import {
  useAddBook,
  useDeleteBook,
  useEditBook,
  useFetchBooks,
} from "./services/api";
import { mockBooks, mockFunction } from "./setupTests";

describe("App", () => {
  it("renders App component", () => {
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
    render(<App />);

    expect(screen.getByText("Your book library")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add book/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("book-list")).toBeInTheDocument();
  });
});
