import CopyAllOutlined from "@mui/icons-material/CopyAllOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
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
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  const sharePassword = trpc.useMutation(["password.post"]);

  const handleChange =
    (prop: keyof State) =>
    ({ target: { value } }: { target: { value: string } }) => {
      if (error) setError(false);
      setValues({ ...values, [prop]: value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickCopyLink = () => {
    if (!sharePassword.data) return;
    setOpen(true);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL}/share/${sharePassword.data.data}`,
    );
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = () => {
    const { lifetime, openWithPassword, sharedPassword } = values;
    if (!sharedPassword) {
      setError(true);
      return;
    }
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
        <InputLabel htmlFor="password-to-share">Password to share</InputLabel>
        <OutlinedInput
          onChange={handleChange("sharedPassword")}
          value={values.sharedPassword}
          required
          fullWidth
          type={values.showPassword ? "text" : "password"}
          label="Password to share"
          id="password-to-share"
          error={error}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
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
        <InputLabel htmlFor="password-to-access">Password to access</InputLabel>
        <OutlinedInput
          onChange={handleChange("openWithPassword")}
          value={values.openWithPassword}
          fullWidth
          type={values.showPassword ? "text" : "password"}
          label="Password to access"
          id="password-to-access"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        onClick={onSubmit}
        disabled={sharePassword.isLoading}
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
        <>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="link-to-share">Link to share</InputLabel>
            <OutlinedInput
              onFocus={(event) => {
                event.target.select();
              }}
              value={`${process.env.NEXT_PUBLIC_URL}/share/${sharePassword.data.data}`}
              fullWidth
              type="text"
              label="Link to share"
              id="link-to-share"
              aria-readonly
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="copy link"
                    onClick={handleClickCopyLink}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <CopyAllOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Snackbar
            open={open}
            onClose={() => setOpen(false)}
            autoHideDuration={3000}
            message="Copied to clipboard"
          />
        </>
      ) : null}
    </Container>
  );
}

export default ShareForm;
