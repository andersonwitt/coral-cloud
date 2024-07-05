/* eslint-disable react/prop-types */
import { Box, Drawer as MuiDrawer } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../contexts/FilesContext";
import FolderTree from "./FolderTree";

function Drawer({ toggleDrawer, open }) {
  const { updateFiles, dbConnection, updateFolder, folder } = useContext(FilesContext);
  const [innerFiles, setInnerFiles] = useState([]);

  const handleToggleDrawer = (isOpen) => async () => {
    toggleDrawer?.(isOpen);
    if (!isOpen) {
      const result = await dbConnection.searchFiles(folder);
      updateFiles(result);
      updateFolder(folder);
    }
  };

  const handleFolderChanged = (name) => {
    const file = innerFiles.find((item) => item.name === name);
    if (file) {
      updateFolder(file.folderName);
      return;
    }

    updateFolder(name);
  };

  const loadAllFiles = async () => {
    const result = await dbConnection.getAllFiles();
    setInnerFiles(result);
  };

  useEffect(() => {
    if (dbConnection?.db) loadAllFiles();
  }, [dbConnection?.db]);

  return (
    <MuiDrawer open={open} onClose={handleToggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <FolderTree onSelectedChanged={handleFolderChanged} />
      </Box>
    </MuiDrawer>
  );
}

export default Drawer;
