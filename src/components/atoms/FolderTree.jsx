/* eslint-disable react/prop-types */
import { RichTreeView } from "@mui/x-tree-view";
import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../contexts/FilesContext";

function FolderTree({ onSelectedChanged }) {
  const { dbConnection } = useContext(FilesContext);
  const [folders, setFolders] = useState([]);

  const handleSelectedChanged = (_, itemID) => {
    onSelectedChanged?.(itemID);
  };

  async function retrieveFolders() {
    const foldersResult = await dbConnection.getAllFolders();
    const filesResult = await dbConnection.getAllFiles();

    const buildTree = (parent) => {
        const folders = foldersResult
          .filter((item) => item.previous === parent)
          .map((item) => ({
            id: item.name,
            label: item.name,
            children: buildTree(item.name),
          }));
  
        const files = filesResult
          .filter((item) => item.folderName === parent)
          .map((item) => ({
            id: item.name,
            label: item.name,
            children: [],
          }));
  
        return [...folders, ...files];
      };

    const tree = [{ id: "root", label: "Raiz", children: buildTree("root") }];

    setFolders(tree);
  }

  useEffect(() => {
    retrieveFolders();
  }, []);

  return (
    <RichTreeView
      items={folders}
      defaultSelectedItems="root"
      onSelectedItemsChange={handleSelectedChanged}
    />
  );
}

export default FolderTree;
