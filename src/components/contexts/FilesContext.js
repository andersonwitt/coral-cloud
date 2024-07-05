import IndexedDBConnection from "../../utils/IndexedDBConnection";
import { createContext } from "react";

export const FilesContext = createContext({
  dbConnection: new IndexedDBConnection("fileDB", 1),
  files: [],
  updateFiles: () => {},
  folder: "",
  updateFolder: () => {},
});
