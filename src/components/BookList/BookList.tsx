import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
} from "@mui/material";
import { Book } from "../../types/types";
import { BookForm } from "../BookForm/BookForm";
import { useState } from "react";
import { useDeleteBook } from "../../services/api";

const BookList: React.FC<{ books: Book[] }> = ({ books }) => {
  const [isBookModalOpen, setBookModalOpen] = useState<null | "add" | Book>(
    null
  );
  const { deleteBook } = useDeleteBook();

  return (
    <>
      <Table data-testid="book-list">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book: Book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.description}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={{ xs: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => setBookModalOpen(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={async () => await deleteBook(book.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <BookForm open={isBookModalOpen} onClose={() => setBookModalOpen(null)} />
    </>
  );
};

export { BookList };
