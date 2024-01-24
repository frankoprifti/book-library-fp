// components/BookForm.tsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
} from "@mui/material";
import { useAddBook, useEditBook } from "../../services/api";
import { Book } from "../../types/types";
import { useSnackbar } from "../../context/SnackbarContext";
import * as Yup from "yup";

interface BookFormProps {
  open: null | "add" | Book;
  onClose: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ open, onClose }) => {
  const { addBook } = useAddBook();
  const { editBook } = useEditBook();
  const { openSnackbar } = useSnackbar();

  const handleAddBookSubmit = async (
    values: {
      title: string;
      author: string;
      genre: string;
      description: string;
    },
    type: "add" | Book
  ) => {
    if (type === "add") {
      try {
        await addBook(values);
      } catch (error) {
        return openSnackbar(`Error adding book`, "error");
      }
    } else if (open !== "add") {
      try {
        await editBook(open?.id!, values);
      } catch (error) {
        return openSnackbar(`Error updating book`, "error");
      }
    }
    onClose();
    openSnackbar(`Book saved successfully`);
    formik.resetForm();
  };

  const bookSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    author: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    description: Yup.string().min(20, "Too Short!"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
    },
    validationSchema: bookSchema,
    onSubmit: (values) => {
      handleAddBookSubmit(values, open!);
    },
  });

  useEffect(() => {
    if (open !== "add") {
      formik.setValues({
        title: open?.title || "",
        author: open?.author || "",
        genre: open?.genre || "",
        description: open?.description || "",
      });
    }
  }, [open]);

  return (
    <Dialog open={!!open} onClose={onClose} data-testid={"book-form-modal"}>
      <DialogTitle>{open === "add" ? "Add a new" : "Edit"} Book</DialogTitle>
      <DialogContent>
        <form data-testid={"form"} onSubmit={formik.handleSubmit}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            value={formik.values.title}
            error={!!formik.errors.title}
            helperText={formik.errors.title}
            aria-errormessage="test"
          />
          <TextField
            label="Author"
            name="author"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            value={formik.values.author}
            error={!!formik.errors.author}
            helperText={formik.errors.author}
          />
          <TextField
            label="Genre"
            name="genre"
            fullWidth
            margin="normal"
            onChange={formik.handleChange}
            value={formik.values.genre}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={!!formik.errors.description}
            helperText={formik.errors.description}
          />
          <Stack direction={"row"} spacing={{ sm: 1 }}>
            <Button type="submit" variant="contained" color="primary">
              {open === "add" ? "Add" : "Save"} Book
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
            >
              Close
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { BookForm };
