import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";
import { useAddBook, useEditBook } from "../../services/api";

describe("Header", () => {
  beforeEach(() => {
    const mockFunction = jest.fn();
    (useAddBook as jest.Mock).mockReturnValue({
      addBook: mockFunction,
    });
    (useEditBook as jest.Mock).mockReturnValue({
      editBook: mockFunction,
    });
  });
  it("renders Header component", () => {
    render(<Header />);

    expect(screen.getByText("Your book library")).toBeInTheDocument();

    const addButton = screen.getByRole("button", { name: /add book/i });
    expect(addButton).toBeInTheDocument();
  });

  it("opens BookForm when 'Add book' button is clicked and closes when Close is clicked", async () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /add book/i }));

    expect(screen.getByTestId("book-form-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByTestId("book-form-modal")).not.toBeInTheDocument();
    });
  });
});
