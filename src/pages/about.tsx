import NextLink from "next/link";

import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const About: NextPage = () => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Password Sharing App
        </Typography>
        <NextLink href="https://github.com/cowoder/pws" passHref>
          <Link
            target="_blank"
            rel="noopener"
            color="primary"
            underline="none"
            sx={{ cursor: "pointer", my: 2 }}
          >
            source code
          </Link>
        </NextLink>
        <NextLink href="https://cowoder.com/" passHref>
          <Link
            target="_blank"
            rel="noopener"
            color="secondary"
            underline="none"
            sx={{ cursor: "pointer" }}
          >
            cowoder website
          </Link>
        </NextLink>
      </Box>
    </Container>
  );
};

export default About;
