import { AppBar, Toolbar, Typography } from "@mui/material";

function Footer() {
  return (
    <>
      <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Typography>Footer</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Footer;
