import { useState } from "react";
import Uploader from "../organisms/Uploader";
import { Box, Fab } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

function FAB() {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);

  const toggleUploader = (isOpen) => {
    setIsUploaderOpen(isOpen);
  };

  return (
    <>
      <Uploader open={isUploaderOpen} toggle={toggleUploader} />
      <Box position="fixed" sx={{ bottom: 0, right: 0, p: 3 }}>
        <Fab
          color="primary"
          aria-label="add"
          onClick={() => toggleUploader(true)}
        >
          <AddOutlined />
        </Fab>
      </Box>
    </>
  );
}
export default FAB;
