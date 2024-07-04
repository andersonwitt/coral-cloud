import { MenuOutlined } from "@mui/icons-material";
import {
  IconButton,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Drawer from "./Drawer";

function AppBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleToggleDrawer = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  return (
    <>
      <MuiAppBar position="fixed">
        <Toolbar>
          <IconButton onClick={() => handleToggleDrawer(true)}>
            <MenuOutlined />
          </IconButton>
          <Typography>Coral Cloud</Typography>
        </Toolbar>
      </MuiAppBar>
      <Drawer open={isDrawerOpen} toggleDrawer={handleToggleDrawer} />
    </>
  );
}

export default AppBar;
