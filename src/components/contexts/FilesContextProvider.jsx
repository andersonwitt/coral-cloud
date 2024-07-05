/* eslint-disable react/prop-types */
import IndexedDBConnection from "../../utils/IndexedDBConnection";
import { FilesContext } from "./FilesContext";
import { useEffect, useState } from "react";

export function FilesContextProvider({ children }) {
  const [dbConnection, setDbConnection] = useState(null);
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState("root");

  useEffect(() => {
    const connectDB = async () => {
      const connection = new IndexedDBConnection("fileDB", 1);
      await connection.open();
      setDbConnection(connection);
    };
    connectDB();
  }, []);

  const updateFiles = (files) => {
    setFiles(files);
  };

  const updateFolder = (folder) => {
    setFolder(folder);
  };

  return (
    <FilesContext.Provider
      value={{ dbConnection, files, updateFiles, folder, updateFolder }}
    >
      {children}
    </FilesContext.Provider>
  );
}
