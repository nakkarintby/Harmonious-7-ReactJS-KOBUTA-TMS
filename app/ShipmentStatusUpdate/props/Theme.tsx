'use client'
import { createTheme } from "@mui/material/styles";
import "./Home.css";

let defaultTheme = createTheme({
  typography: {
    fontFamily: ["Kanit-M"].join(","),
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
});


export default defaultTheme;
  