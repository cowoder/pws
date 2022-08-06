import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { trpc } from "../utils/trpc";

interface State {
  showPassword: boolean;
  lifetime: number;
  openWithPassword: string;
  sharedPassword: string;
}

const lifetimes = [
  {
    value: 15 * 60,
    label: "15 minutes",
  },
  {
    value: 60 * 60,
    label: "1 hour",
  },
  {
    value: 4 * 60 * 60,
    label: "4 hours",
  },
  {
    value: 12 * 60 * 60,
    label: "12 hours",
  },
  {
    value: 24 * 60 * 60,
    label: "1 day",
  },
  {
    value: 2 * 24 * 60 * 60,
    label: "2 days",
  },
  {
    value: 7 * 24 * 60 * 60,
    label: "1 week",
  },
];

const initialValues = {
  showPassword: false,
  lifetime: 15 * 60,
  openWithPassword: "",
  sharedPassword: "",
};

function ShareForm() {
  const [values, setValues] = useState<State>(initialValues);

  const sharePassword = trpc.useMutation(["password.post"]);

  const handleChange =
    (prop: keyof State) =>
    ({ target: { value } }: { target: { value: string } }) => {
      setValues({ ...values, [prop]: value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const onSubmit = () => {
    const { lifetime, openWithPassword, sharedPassword } = values;
    sharePassword.mutate({
      lifetime,
      openWithPassword,
      sharedPassword,
    });
    setValues(initialValues);
  };

  return (
    <Container
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <FormControl fullWidth margin="normal">
        <TextField
          onChange={handleChange("sharedPassword")}
          value={values.sharedPassword}
          required
          fullWidth
          type="password"
          label="Password to share"
          id="password-to-share"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="lifetime-label">Lifetime</InputLabel>
        <Select
          onChange={handleChange("lifetime")}
          value={values.lifetime.toString()}
          required
          fullWidth
          labelId="lifetime-label"
          label="Lifetime"
          id="lifetime"
        >
          {lifetimes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          onChange={handleChange("openWithPassword")}
          value={values.openWithPassword}
          fullWidth
          type="password"
          label="Password to access"
          id="password-to-access"
        />
      </FormControl>
      <Button
        onClick={onSubmit}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Share
      </Button>
      {sharePassword.isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : null}
      {sharePassword.error ? (
        <Box sx={{ width: "100%" }}>
          <Alert severity="error">{sharePassword.error.message}</Alert>
        </Box>
      ) : null}
      {sharePassword.data ? (
        <FormControl fullWidth margin="normal">
          <TextField
            value={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/share/${sharePassword.data.data}`}
            fullWidth
            type="text"
            label="Link to share"
            id="link-to-share"
            aria-readonly
          />
        </FormControl>
      ) : null}
    </Container>
  );
}

export default ShareForm;
