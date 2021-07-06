import { createMuiTheme } from "@material-ui/core";

export const dark = () =>
  createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#040f3d",
      },
      secondary: {
        main: "#757575",
      },
    },
  });

export const light = () =>
  createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#96dad5",
      },
      secondary: {
        main: "#ff80ab",
      },
    },
  });
