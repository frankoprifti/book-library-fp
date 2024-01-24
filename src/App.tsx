import BookListContainer from "./components/BookListContainer/BookListContainer";
import Header from "./components/Header/Header";
import { SnackbarProvider } from "./context/SnackbarContext";

function App() {
  return (
    <SnackbarProvider>
      <div className="App">
        <Header />
        <BookListContainer />
      </div>
    </SnackbarProvider>
  );
}

export default App;
