import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material";
import { FileUploadOutlined, FolderOutlined } from "@mui/icons-material";
import Uploader from "../organisms/Uploader";
import Folder from "../organisms/Folder";
import { useState } from "react";

function FAB() {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  const toggleUploader = (isOpen) => {
    setIsUploaderOpen(isOpen);
  };

  const toggleFolder = (isOpen) => {
    setIsFolderOpen(isOpen);
  };

  return (
    <>
      <Uploader open={isUploaderOpen} toggle={toggleUploader} />
      <Folder open={isFolderOpen} toggle={toggleFolder} />
      <Box position="fixed" sx={{ bottom: 0, right: 0, p: 3 }}>
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          <SpeedDialAction
            icon={<FolderOutlined />}
            tooltipTitle="Nova pasta"
            tooltipOpen
            onClick={() => toggleFolder(true)}
          />
          <SpeedDialAction
            icon={<FileUploadOutlined />}
            tooltipTitle="Novo Arquivo"
            tooltipOpen
            onClick={() => toggleUploader(true)}
          />
        </SpeedDial>
      </Box>
    </>
  );
}
export default FAB;
