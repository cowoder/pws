import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ReceiveForm from "../../components/ReceiveForm";
import { prisma } from "../../server/db/client";
import { decryptPassword } from "../../server/router/password";
import { deletePassword } from "../../utils/deletePassword";

import type { GetServerSideProps } from "next";

const Shared: React.FC<{
  shareId?: string;
  sharedPassword?: string;
  requirePassword: boolean;
}> = ({ shareId, sharedPassword, requirePassword }) => {
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
        {requirePassword ? (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Going to need a password to access that one
            </Typography>
            <ReceiveForm sharedId={shareId} />
          </>
        ) : (
          <FormControl fullWidth margin="normal">
            <TextField
              onFocus={(event) => {
                event.target.select();
              }}
              value={sharedPassword}
              fullWidth
              type="text"
              label="Shared password"
              id="shared-password"
              aria-readonly
            />
          </FormControl>
        )}
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const shareId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  if (!shareId) return { notFound: true };
  const storedPassword = await prisma.passwordToShare.findFirst({
    where: { id: shareId },
    select: { sharedPassword: true, openWithPassword: true },
  });
  if (!storedPassword) return { notFound: true };
  const { sharedPassword, openWithPassword } = { ...storedPassword };
  if (openWithPassword) return { props: { shareId, requirePassword: true } };
  else {
    await deletePassword(shareId);
    const decryptedPassword = decryptPassword(sharedPassword);
    return {
      props: { sharedPassword: decryptedPassword, requirePassword: false },
    };
  }
};

export default Shared;
