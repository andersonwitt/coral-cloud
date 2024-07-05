import { SnackbarProvider } from "notistack";
import { FilesContextProvider } from "./components/contexts/FilesContextProvider";
import Home from "./components/pages/Home";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <FilesContextProvider>
        <Home />
      </FilesContextProvider>
    </SnackbarProvider>
  );
}

export default App;
