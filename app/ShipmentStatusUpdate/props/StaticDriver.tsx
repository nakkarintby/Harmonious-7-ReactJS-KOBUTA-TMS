'use client'
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DropPoint from "./DropPoint";
import FooterCom from "../../pages/footer/footer";
import ButtonPhoto from "./ButtonPhoto";
import PhotoDetail from "./PhotoDetail";
import Signature from "./Signature";
import TopToolbar from "./Toolbar";
import "./Home.css";
import Box from "@mui/material/Box";
import ConfirmProduct from "./ConfirmProduct";
import VerifyProduct from "./VerifyProduct";

//Tabs Button

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
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

export default function StaticDriver({ children }:{children: React.ReactNode}) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <div className="Kanit-M">
        <TopToolbar />
          <Box component="main" sx={{ pt: 8 }}>
            <PhotoDetail />
            <ButtonPhoto />
            { children }
            <FooterCom />
          </Box>
        </div>
      </ThemeProvider>
    );
  }