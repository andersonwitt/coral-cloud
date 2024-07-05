import { FilesContext } from "../contexts/FilesContext";
import FileCardList from "../molecules/FileCardList";
import { useContext, useEffect } from "react";
import Layout from "../templates/Layout";

function Home() {
  const { dbConnection, files, updateFiles, updateFolder } = useContext(FilesContext);

  const loadFiles = async () => {
    const result = await dbConnection.searchFiles("root");
    updateFolder('root');
    updateFiles(result);
  };

  useEffect(() => {
    if (dbConnection?.db) {
      loadFiles();
    }
  }, [dbConnection?.db]);

  return (
    <Layout>
      <FileCardList files={files} />
    </Layout>
  );
}

export default Home;
