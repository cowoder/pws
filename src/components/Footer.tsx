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
      <NextLink href="/" passHref={true}>
        <Link color={"secondary"}>Home</Link>
      </NextLink>
      <NextLink href="/about" passHref={true}>
        <Link color={"secondary"}>About</Link>
      </NextLink>
    </Container>
  );
}

export default Footer;
