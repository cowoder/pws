import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
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
    value: 10 * 60,
    label: "10 minutes",
  },
  {
    value: 30 * 60,
    label: "30 minutes",
  },
  {
    value: 60 * 60,
    label: "1 hour",
  },
  {
    value: 6 * 60 * 60,
    label: "6 hours",
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

function ShareForm() {
  const [values, setValues] = useState<State>({
    showPassword: false,
    lifetime: 600,
    openWithPassword: "",
    sharedPassword: "",
  });

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
    sharePassword.mutate({ lifetime, openWithPassword, sharedPassword });
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
    </Container>
  );
}

export default ShareForm;
