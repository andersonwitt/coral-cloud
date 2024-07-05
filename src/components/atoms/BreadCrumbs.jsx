import { Box, Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { FilesContext } from "../contexts/FilesContext";

function BreadCrumbs() {
  const { folder, dbConnection } = useContext(FilesContext);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  async function retrieveBreadcrumbs(folder) {
    const foldersResult = await dbConnection.getAllFolders();
    const breadcrumbList = [];

    const buildBreadcrumbs = (currentFolder) => {
      const parentFolder = foldersResult.find(
        (item) => item.name === currentFolder
      )?.previous;
      if (parentFolder) {
        buildBreadcrumbs(parentFolder);
        breadcrumbList.push(currentFolder);
      }
    };

    buildBreadcrumbs(folder);

    setBreadcrumbs(["Raiz", ...breadcrumbList]);
  }

  useEffect(() => {
    if (dbConnection?.db) {
      retrieveBreadcrumbs(folder);
    }
  }, [folder, dbConnection?.db]);

  return (
    <Box role="presentation">
      <MuiBreadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <Typography key={index} color="text.primary">
            {crumb}
          </Typography>
        ))}
      </MuiBreadcrumbs>
    </Box>
  );
}

export default BreadCrumbs;
