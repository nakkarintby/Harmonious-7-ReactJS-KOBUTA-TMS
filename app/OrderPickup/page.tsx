"use client";
import React from "react";
import { Backdrop, Box, CircularProgress, Grid } from "@mui/material";
import { IsAuthenticationTemplate } from "../api/MSAuthentication/AuthClientHandle";
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme";


export default function OrderPickup () {
    const [openBackDrop, setOpenBackDrop] = React.useState(false);

    return(<>
     <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <IsAuthenticationTemplate>
        <div className="NavBoxGlobal">
          <NavbarMenuTheme CanPreviousBack={true} />
        </div>
        <div className="content-body">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
            
              <Grid item xs={12} md={12} sm={12} xl={12}>
              
              </Grid>
              <Grid item xs={12} md={12} sm={12} xl={12}>
             
              </Grid>
            </Grid>
          </Box>
        </div>
      </IsAuthenticationTemplate>
    </>)
}
