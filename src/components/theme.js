import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#3e3e45",
      main: "#18181e",
      dark: "#000000",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#add3db",
      main: "#7da2a9",
      dark: "#4f737a",
      contrastText: "#000000"
    }
  }
});

export { theme };
