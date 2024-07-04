/* eslint-disable react/prop-types */
import { Box, Drawer as MuiDrawer } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";

function Drawer({ toggleDrawer, open }) {
  const handleToggleDrawer = (isOpen) => () => {
    toggleDrawer?.(isOpen);
  };

  return (
    <MuiDrawer open={open} onClose={handleToggleDrawer(false)}>
      <Box sx={{ width: 250 }} role="presentation">
        <SimpleTreeView>
          <TreeItem itemId="grid" label="Data Grid">
            <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
            <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
            <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium">
              <TreeItem
                itemId="grid-premium-inner"
                label="@mui/x-data-grid-premium"
              />
            </TreeItem>
          </TreeItem>
          <TreeItem itemId="pickers" label="Date and Time Pickers">
            <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
            <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
          </TreeItem>
          <TreeItem itemId="charts" label="Charts">
            <TreeItem itemId="charts-community" label="@mui/x-charts" />
          </TreeItem>
          <TreeItem itemId="tree-view" label="Tree View">
            <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </MuiDrawer>
  );
}

export default Drawer;
