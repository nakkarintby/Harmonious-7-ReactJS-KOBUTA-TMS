import AppBar from "@mui/material/AppBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Swal from "sweetalert2";
import { green } from '@mui/material/colors';
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import "./Home.css";
import { useRouter } from "next/navigation";
import { Checkbox, Modal, ThemeProvider, makeStyles } from "@mui/material";
import defaultTheme from "./Theme";
import { ProductForm } from "../../constant/OrderForm/OrderForm";
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function getLocalStorage(/* product:ProductForm[], productSetState:React.Dispatch<React.SetStateAction<ProductForm[]>> */) {
  if (typeof window !== 'undefined') {
    var getProductForm = localStorage.getItem("question1")
    var result:ProductForm[] = JSON.parse(getProductForm!)
    return result
  }
  return undefined
}

export default function TopToolbar(props: Props) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false);
  let [productForm, setProductForm] = React.useState<ProductForm[]|undefined>(undefined)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createDataModal = (source:ProductForm[]|undefined)=>{
    if(source === undefined) return
    setProductForm(source)
  }

  return (
    <>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Grid container justifyContent={"space-between"}>
            <Grid item>
              <div className="Nav-item-leftBox">
                <a onClick={()=>{router.back()}} className='NavLink-Text'>
                  <ArrowBackIosIcon sx={{ color: 'white' }}/>
                </a>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                  <Typography variant="h6" color="inherit" noWrap>
                    บันทึกสถานะการขนส่ง / <br />
                    Shipment Status Update
                  </Typography>
                </div>
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
                }}>
                <Button
                  variant="contained"
                  sx={{}}
                  onClick={()=>{
                    var result = getLocalStorage()
                    createDataModal(result)
                    handleOpen()
                  }}
                  color="success"
                >
                  Confirm
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* Modal */}
      <Modal
        open={open}
        onClose={()=>{
          handleClose()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <div className="confirm-modal Kanit-M">
          <div className="confirm-modal-title">
            <h2>Please select left question</h2>
          </div>
          <div className="confirm-modal-mainbox">
            {(productForm === undefined) ? <></> : 
            productForm.map((item, index)=>{
              return (
              <div key={index}>
                <p>{index+1}.{item.checkPoint}</p>
                {(item.isCheck === true) ?
                <Checkbox size="small" 
                classes={{root: 'custom-checkbox-root'}}
                  sx={{color: green[800], '&.Mui-checked': 
                  {
                    color: green[600],
                  },}} checked disabled/> :
                <Checkbox size="small" 
                classes={{root: 'custom-checkbox-root'}}
                  sx={{color: green[800], '&.Mui-checked': 
                  {
                    color: green[600],
                  },}} disabled/>
                }
              </div>
              )
            })}
            
          </div>
        </div>
      </Modal>
    </ThemeProvider>
    </>
  );
}

{/* <ul>
        <li className="confirm-modal">
          <p>
            1.คอนโซลหน้า
          </p>
          <p className="confirm-modal">
            1.คอนโซลหน้า
          </p>
        </li>
        <li>2.ฝาครอบสีส้มใต้ถังบรรจุเมล็ดข้าว</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        <li>GET UP GET UP GET UP</li>
        </ul> */}