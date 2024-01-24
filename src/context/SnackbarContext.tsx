import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, {
  ReactElement,
  createContext,
  useContext,
  useState,
} from "react";

interface SnackbarContextType {
  openSnackbar: (newMessage: string, type?: AlertColor) => void;
  closeSnackbar: () => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: { children: ReactElement }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");

  const openSnackbar = (newMessage: string, type?: AlertColor) => {
    setMessage(newMessage);
    setOpen(true);
    setType(type!);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert color={type}>
          <div>{message}</div>
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
