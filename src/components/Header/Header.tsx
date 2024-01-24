import { Button } from "@mui/material";
import React, { useState } from "react";
import "./Header.scss";
import { BookForm } from "../BookForm/BookForm";
import { Book } from "../../types/types";

const Header: React.FC = () => {
  const [isBookModalOpen, setBookModalOpen] = useState<null | "add" | Book>(
    null
  );

  return (
    <div className="header-container">
      <h1>Your book library</h1>
      <Button variant="contained" onClick={() => setBookModalOpen("add")}>
        Add book
      </Button>
      <BookForm open={isBookModalOpen} onClose={() => setBookModalOpen(null)} />
    </div>
  );
};

export default Header;
