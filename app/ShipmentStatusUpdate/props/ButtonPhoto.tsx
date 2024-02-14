import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
type Props = {};

export default function ButtonPhoto({}: Props) {
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
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button component="label" variant="contained" color="error">
                  <DeleteForeverIcon />
                </Button>
                <Button component="label" variant="contained">
                  <AddAPhotoIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
