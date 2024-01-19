import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React from "react";
import SignaturePad from "react-signature-canvas";
import SignatureCanvas from "react-signature-canvas";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Signature({}: Props) {
  //Sig
  let padRef = React.useRef<SignatureCanvas>(null);
  const [dataURL, setDataURL] = React.useState<string | null>(null);
  const clear = () => {
    padRef.current?.clear();
  };

  const trim = () => {
    const url = padRef.current?.getTrimmedCanvas().toDataURL("image/png");
    if (url) setDataURL(url);
  };

  const remove = () => {
    setDataURL(null);
  };

  //end Sig
  return (
    <>
      <Container sx={{ py: 2 }}>
        <Grid container spacing={2} sx={{ py: 2 }}>
          <Grid item xs={12}>
            <div>Signature</div>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <SignaturePad
                ref={padRef}
                canvasProps={{
                  height: 233,
                  width: 350,
                  
                  style: { border: "1px solid black" },
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div className="sigPreview">
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
                >
                  <Button onClick={clear} color="error" component="label" variant="contained"><ClearIcon></ClearIcon></Button>
                  <Button onClick={trim}><CheckIcon></CheckIcon></Button>
                </ButtonGroup>

              </div>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div>Signature Resulte : </div>
          </Grid>
          <Grid item xs={12} py={2}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div className="sigPreview"> 
                {dataURL ? (
                  <img
                    className={"sigImage"}
                    src={dataURL}
                    alt="user generated signature"
                    
                  />
                ) : null}
              </div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
