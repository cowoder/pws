import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Head from "next/head";
import { useState } from "react";

import ReceiveForm from "../components/ReceiveForm";
import ShareForm from "../components/ShareForm";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const [showShareForm, setShowShareForm] = useState(false);
  const [showReceiveForm, setShowReceiveForm] = useState(false);

  return (
    <>
      <Head>
        <title>PWS - Password Share</title>
        <meta
          name="description"
          content="PWS - Password Share - a simple password sharing tool"
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
            Would you like to share or receive a password?
          </Typography>
          <Button
            onClick={() => setShowShareForm(!showShareForm)}
            fullWidth
            variant="outlined"
            size="large"
            sx={{ my: 2 }}
          >
            Share password
          </Button>
          {showShareForm ? <ShareForm /> : null}
          <Button
            onClick={() => setShowReceiveForm(!showReceiveForm)}
            fullWidth
            variant="outlined"
            size="large"
            sx={{ my: 2 }}
          >
            Receive password
          </Button>
          {showReceiveForm ? <ReceiveForm /> : null}
        </Box>
      </Container>
    </>
  );
};

export default Home;
