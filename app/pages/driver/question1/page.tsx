'use client'
import * as React from "react";
import { useRouter } from 'next/navigation'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../Home.css";
import Box from "@mui/material/Box";
import Component from "react-responsive/types/Component";
import { ST } from "next/dist/shared/lib/utils";
import StaticDriver from "../StaticDriver";
import VerifyProduct from "../VerifyProduct";
import TopToolbar from "../Toolbar";
import DropPoint from "../DropPoint";
import ButtonPhoto from "../ButtonPhoto";
import PhotoDetail from "../PhotoDetail";
import Signature from "../../component/Signature";
import FooterCom from "../../footer/footer";

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

export default function Home(TestParam:String) {
  const router = useRouter();
  //const dataFromPreviousPage = router.locale?.length;
  //console.log(dataFromPreviousPage)
  return (

    <StaticDriver children={VerifyProduct()}/>
  );
}

<ThemeProvider theme={defaultTheme}>
      <div className="Kanit-M">
      <TopToolbar />
        <Box component="main" sx={{ pt: 8 }}>
          <DropPoint />
          <ButtonPhoto />
          <PhotoDetail />
          <VerifyProduct />
          <Signature />
          <FooterCom />
        </Box>
      </div>
    </ThemeProvider>