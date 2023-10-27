import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import NextLink from "next/link";

import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <Head>
        <title>About PWS - Password Share</title>
        <meta
          name="description"
          content="PWS - Password Share - a simple app by cowoder"
        />
      </Head>
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
          <Link
            component={NextLink}
            href="https://github.com/cowoder/pws"
            target="_blank"
            rel="noopener"
            color="primary"
            underline="none"
            sx={{ cursor: "pointer", my: 2 }}
          >
            source code
          </Link>
          <Link
            component={NextLink}
            href="https://cowoder.com/"
            target="_blank"
            rel="noopener"
            color="secondary"
            underline="none"
            sx={{ cursor: "pointer" }}
          >
            cowoder website
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default About;
