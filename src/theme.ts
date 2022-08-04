import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const createMyTheme = (prefersDarkMode = true) =>
  createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
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
        default: prefersDarkMode ? "#121212" : "#eaeaea",
      },
    },
  });

export default createMyTheme;
