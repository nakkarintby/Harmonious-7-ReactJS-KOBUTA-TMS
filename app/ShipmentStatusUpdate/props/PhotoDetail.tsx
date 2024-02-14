import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function PhotoDetail(props: Props) {
  return (
    <>
      <Container sx={{ py: 2 }}>
        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Suspense fallback={<p>Loading feed...</p>}>
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 233 },
                    maxWidth: { xs: 350, md: 350 },
                  }}
                  alt="The house from the offer."
                  src="https://www.kasbox.com/images/ready-template/crop-1593683162560.jpg"
                />
              </Suspense>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" align="center" gutterBottom>
              Photo Detail :  0/1
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
