/* eslint-disable react/prop-types */
import { DownloadOutlined } from "@mui/icons-material";
import {
  Avatar,
  CardActions,
  CardContent,
  IconButton,
  Card as MuiCard,
  Typography,
} from "@mui/material";

const formatSize = (size) => `${size} MB`;

function Card({ file }) {
  return (
    <MuiCard sx={{ maxWidth: 128 }}>
      <CardContent>
        <Avatar>{file.extension}</Avatar>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {file.name}
        </Typography>
      </CardContent>
      <CardActions>
        {formatSize(file.size)}
        <IconButton>
          <DownloadOutlined />
        </IconButton>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
