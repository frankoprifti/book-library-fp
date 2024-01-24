import React from "react";
import { useFetchBooks } from "../../services/api";
import { BookList } from "../BookList/BookList";

const BookListContainer: React.FC = () => {
  const { books, isLoading, isError } = useFetchBooks();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading books</div>;
  }

  return <BookList books={books} />;
};

export default BookListContainer;
