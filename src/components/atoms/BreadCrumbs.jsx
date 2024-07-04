import { Box, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";

function BreadCrumbs() {
  return (
    <Box role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Raiz</Typography>
        <Typography color="text.primary">Backups</Typography>
      </MuiBreadcrumbs>
    </Box>
  );
}

export default BreadCrumbs;
