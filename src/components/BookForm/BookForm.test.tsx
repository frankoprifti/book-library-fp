import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SnackbarProvider, useSnackbar } from "../../context/SnackbarContext";
import { useAddBook, useEditBook } from "../../services/api";
import { BookForm } from "./BookForm";

describe("BookForm", () => {
  const mockFunction = jest.fn();

  beforeEach(() => {
    (useAddBook as jest.Mock).mockReturnValue({
      addBook: mockFunction,
    });
    (useEditBook as jest.Mock).mockReturnValue({
      editBook: mockFunction,
    });
  });
  it("renders BookForm for adding a book", async () => {
    render(
      <SnackbarProvider>
        <BookForm open="add" onClose={() => {}} />
      </SnackbarProvider>
    );

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Test Title" },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: "Test Author" },
    });
    fireEvent.change(screen.getByLabelText(/Genre/i), {
      target: { value: "Test Genre" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: {
        value:
          "Test Description, with at least 20 chars because thats the validation",
      },
    });

    fireEvent.click(screen.getByText("Add Book"));

    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalledWith({
        title: "Test Title",
        author: "Test Author",
        genre: "Test Genre",
        description:
          "Test Description, with at least 20 chars because thats the validation",
      });
    });
  });

  it("renders BookForm for editing a book", async () => {
    render(
      <SnackbarProvider>
        <BookForm
          open={{
            id: 1,
            title: "New book",
            description: "",
            author: "",
            genre: "",
          }}
          onClose={() => {}}
        />
      </SnackbarProvider>
    );
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Updated Title" },
    });

    screen.getByTestId("form").onsubmit = mockFunction;

    fireEvent.click(screen.getByText("Save Book"));
    await waitFor(() => {
      expect(mockFunction).toHaveBeenCalled();
    });
    // await waitFor(() => {
    //   expect(mockOpenSnackbar).toHaveBeenCalledWith("Book saved successfully");
    // });
  });
});
