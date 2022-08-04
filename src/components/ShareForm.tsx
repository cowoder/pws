import { FormControl } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

function ShareForm() {
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
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password to share"
        type="password"
        id="password-to-share"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="lifetime-label">Lifetime</InputLabel>
        <Select
          labelId="lifetime-label"
          required
          id="lifetime"
          value={null}
          label="Lifetime"
          fullWidth
        >
          <MenuItem value={5}>Five minutes</MenuItem>
          <MenuItem value={10}>Ten minutes</MenuItem>
          <MenuItem value={30}>Thirty minutes</MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        fullWidth
        label="Password to access (optional)"
        type="password"
        id="password-to-access"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Share
      </Button>
    </Container>
  );
}

export default ShareForm;
