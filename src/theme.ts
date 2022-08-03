import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const paletteType = "dark";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: paletteType,
    primary: {
      main: "#1AC8ED",
    },
    secondary: {
      main: "#D6DBB2",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: paletteType === "dark" ? "#121212" : "#eaeaea",
    },
  },
});

export default theme;
