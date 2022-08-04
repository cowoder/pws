import { AppBar, Toolbar, Typography } from "@mui/material";
import React from "react";

function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="primary">
          Password Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
