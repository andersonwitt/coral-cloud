/* eslint-disable react/prop-types */
import { DownloadOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  IconButton,
  Card as MuiCard,
  Typography,
} from "@mui/material";

const formatSize = (size) => {
  if (size < 1024) return `${size} B`;
  else if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
  else if (size < 1073741824) return `${(size / 1048576).toFixed(2)} MB`;
  else return `${(size / 1073741824).toFixed(2)} GB`;
};

function Card({ file }) {
  function downloadFile() {
    // Step 1: Create a Blob from the ArrayBuffer
    const blob = new Blob([file.buffer], { type: file.type });

    // Step 2: Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Step 3: Create a link element
    const link = document.createElement("a");
    link.href = url;

    // Step 4: Set the download attribute with the filename
    link.download = file.name;

    // Step 5: Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Step 6: Revoke the Blob URL to release memory
    URL.revokeObjectURL(url);

    // Cleanup the link element
    document.body.removeChild(link);
  }

  const handleDownloadClicked = () => {
    const arrayBuffer = new ArrayBuffer(8); // Replace with your actual ArrayBuffer
    downloadFile(arrayBuffer, "example.txt");
  };

  return (
    <MuiCard
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: 230,
        minWidth: 230,
        maxHeight: 230,
        minHeight: 230,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Avatar style={{ width: 80, height: 80 }}>{file.extension}</Avatar>
        </Box>
        <Typography
          noWrap
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        >
          {file.name}
        </Typography>
      </CardContent>
      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {formatSize(file.size)}
        <IconButton onClick={handleDownloadClicked}>
          <DownloadOutlined />
        </IconButton>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
