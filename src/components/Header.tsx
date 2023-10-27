import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import React from "react";

function Header() {
  return (
    <AppBar position="static" sx={{ my: 4 }}>
      <Toolbar>
        <NextLink href="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h5"
            component="h1"
            color={"secondary"}
            sx={{ cursor: "pointer" }}
          >
            🔒 Password Share
          </Typography>
        </NextLink>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
