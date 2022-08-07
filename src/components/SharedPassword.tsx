import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import LinearProgress from "@mui/material/LinearProgress";
import TextField from "@mui/material/TextField";

import { trpc } from "../utils/trpc";

function SharedPassword({
  values: { id, password },
}: {
  values: { id: string; password: string };
}) {
  const { data, isLoading, error } = trpc.useQuery(
    ["password.get", { id, password }],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  );
  if (isLoading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  else if (error)
    return (
      <Box sx={{ width: "100%" }}>
        <Alert severity="error">{error.message}</Alert>
      </Box>
    );
  else
    return (
      <>
        <FormControl fullWidth margin="normal">
          <TextField
            onFocus={(event) => {
              event.target.select();
            }}
            value={data}
            fullWidth
            type="text"
            label="Shared password"
            id="shared-password"
            aria-readonly
          />
        </FormControl>
        <Box sx={{ width: "100%" }}>
          <Alert severity="warning">Will only show once</Alert>
        </Box>
      </>
    );
}

export default SharedPassword;
