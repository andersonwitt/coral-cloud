/* eslint-disable react/prop-types */
import { Box, Container, useTheme } from "@mui/material";
import BreadCrumbs from "../atoms/BreadCrumbs";
import AppBar from "../atoms/AppBar";
import FAB from "../atoms/FAB";

function Layout({ children }) {
  const theme = useTheme();

  return (
    <>
      <AppBar />
      <Container maxWidth="xl" sx={{ my: 8, pt: theme.spacing(1) }}>
        <Box display="flex" flexDirection="column" gap={3}>
          <BreadCrumbs />
          {children}
        </Box>
      </Container>
      <FAB />
    </>
  );
}

export default Layout;
