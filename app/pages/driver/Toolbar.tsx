import AppBar from "@mui/material/AppBar";
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Swal from "sweetalert2";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function TopToolbar(props: Props) {
  const showAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Completed",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <Typography variant="h6" color="inherit" noWrap>
                  บันทึกสถานะการขนส่ง / <br />
                  Shipment Status Update
                </Typography>
              </div>
            </Grid>
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  flexDirection: "column",
                  p: 1,
                  m: 1,
             
                  borderRadius: 1,
                }}
              >
                <Button
                  variant="contained"
                  sx={{}}
                  onClick={showAlert}
                  color="success"
                >
                  Confirm
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
