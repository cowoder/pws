import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import NextLink from "next/link";

function Footer() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        my: 4,
      }}
    >
      <Link component={NextLink} href="/" color={"secondary"}>
        Home
      </Link>
      <Link component={NextLink} href="/about" color={"secondary"}>
        About
      </Link>
    </Container>
  );
}

export default Footer;
