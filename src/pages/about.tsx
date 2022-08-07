import NextLink from "next/link";

import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
        <NextLink href="https://github.com/cowoder/pws" target="_blank">
          <Typography color="primary" sx={{ cursor: "pointer", my: 2 }}>
            source code
          </Typography>
        </NextLink>
        <NextLink href="https://cowoder.com/" target="_blank">
          <Typography color="secondary" sx={{ cursor: "pointer" }}>
            cowoder website
          </Typography>
        </NextLink>
      </Box>
    </Container>
  );
};

export default About;
