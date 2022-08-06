import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import SharedPassword from "./SharedPassword";

interface State {
  id: string;
  password: string;
  showPassword: boolean;
}

function ReceiveForm({ sharedId = "" }) {
  const [values, setValues] = useState<State>({
    id: sharedId,
    password: "",
    showPassword: false,
  });
  const [submitValues, setSubmitValues] = useState({
    id: "",
    password: "",
  });
  const [showResponse, setShowResponse] = useState(false);

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
    const { id, password } = values;
    if (!id) return;
    setSubmitValues({ id, password });
    setShowResponse(true);
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
          onChange={handleChange("id")}
          value={values.id}
          required
          fullWidth
          type="text"
          label="Shared id"
          id="shared-id"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          onChange={handleChange("password")}
          value={values.password}
          fullWidth
          type="password"
          label="Password to access shared password"
          id="password-to-access-shared-password"
        />
      </FormControl>
      <Button
        onClick={onSubmit}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Receive
      </Button>
      {showResponse ? <SharedPassword values={submitValues} /> : null}
    </Container>
  );
}

export default ReceiveForm;
