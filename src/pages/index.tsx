import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { trpc } from "../utils/trpc";

import type { NextPage } from "next";
import { useState } from "react";
import ShareForm from "../components/ShareForm";

const Home: NextPage = () => {
  const [showForm, setShowForm] = useState(false);

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
          Would you like to share or receive a password?
        </Typography>
        <Button
          onClick={() => setShowForm(!showForm)}
          fullWidth
          variant="outlined"
          size="large"
          sx={{ my: 2 }}
        >
          Share password
        </Button>
        {showForm ? (
          <ShareForm />
        ) : (
          <Button fullWidth variant="outlined" size="large" sx={{ my: 2 }}>
            Receive password
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default Home;
