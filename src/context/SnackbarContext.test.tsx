import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SnackbarProvider, useSnackbar } from "./SnackbarContext";

jest.mock("./SnackbarContext", () => ({
  ...jest.requireActual("./SnackbarContext"),
  useSnackbar: jest.fn(),
}));

describe("SnackbarContext", () => {
  it("renders and triggers snackbar", async () => {
    const mockOpenSnackbar = jest.fn();
    (useSnackbar as jest.Mock).mockReturnValue({
      openSnackbar: mockOpenSnackbar,
      closeSnackbar: jest.fn(),
    });

    render(
      <SnackbarProvider>
        <button onClick={() => mockOpenSnackbar("Test Message", "info")}>
          Show info Snackbar
        </button>
      </SnackbarProvider>
    );

    const infoButton = screen.getByText("Show info Snackbar");
    userEvent.click(infoButton);
    expect(mockOpenSnackbar).toHaveBeenCalledWith("Test Message", "info");
  });
});
