import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";

function Header() {
  return (
    <AppBar position="static" sx={{ my: 4 }}>
      <Toolbar>
        <Typography variant="h5" component="h1" color={"secondary"}>
          🔒 Password Share
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
