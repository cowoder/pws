import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { trpc } from "../utils/trpc";

import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery([
    "example.hello",
    { text: "from tRPC" },
  ]);

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
        <Box>
          <Button fullWidth variant="outlined" size="large" sx={{ my: 2 }}>
            Share password
          </Button>
          <Button fullWidth variant="outlined" size="large" sx={{ my: 2 }}>
            Receive password
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
