/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import Card from "../atoms/Card";

function FileCardList({ files }) {
  return (
    <Grid container spacing={2} sx={{ display: "flex", justifyContent: 'center' }}>
      {files.map((file) => (
        <Grid key={file.name} item>
          <Card file={file} />
        </Grid>
      ))}
    </Grid>
  );
}

export default FileCardList;
