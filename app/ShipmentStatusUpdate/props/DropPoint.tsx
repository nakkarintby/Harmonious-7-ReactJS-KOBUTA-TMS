import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { OrderForm } from "../../constant/OrderForm/OrderForm";
import { matDetail } from "../ShipmentDetail/page";



export default function DropPoint({currMatCode, orderForm, matDetailList, setCurrMatcode}:{currMatCode:matDetail, orderForm:OrderForm, matDetailList:matDetail[], setCurrMatcode:React.Dispatch<React.SetStateAction<matDetail|undefined>>}) {
  const cards = [1];
  const drops = [1];
  const [value, setValue] = React.useState(0);
  
  /* useEffect(()=>{
    if(orderForm !== undefined) {
      var result:matDetail[] = createMatDetailList(orderForm)
      setMatDetailList(result)
    }
  },[orderForm]) */
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const matCodeHandleChange = (event: SelectChangeEvent) => {
    matDetailList.map((item, index)=>{
      if(item.serialNo === event.target.value) {
        console.log(item.serialNo)
        setCurrMatcode(item)
      }
    })
    
  };
/*   useEffect(()=>{
    orderForm
  }) */
  return (
    <>
      <Container sx={{ py: 4 }}>
        <Grid container>
        {/* <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                width: "100%",
              }}
            >
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button component="label" variant="contained" color="success">
                 Confirm
                </Button>
              </ButtonGroup>
            </Box>
          </Grid> */}
          {/* <Grid item>
            <Box
              sx={{
                maxWidth: { xs: 320, sm: 480 },
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {drops.map((x) => (
                  <Tab key={x} label={`Group KLD ${x}`} />
                ))}
              </Tabs>
            </Box>
          </Grid> */}
          {cards.map((card) => (
            <Grid item sx={{ pt: 2 }} key={card} xs={12} sm={12} md={12}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Shipment Group : {orderForm ? orderForm.shipmentGroup : ""}
                  </Typography>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemText
                        primary="License Plate"
                        secondary={orderForm ? orderForm.licensePlate : ""}
                      />
                      <ListItemText>
                      <Select
                        style={{minWidth:200}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={(currMatCode) ? currMatCode.serialNo : "NONE"}
                        label="Age"
                        onChange={matCodeHandleChange}
                      >
                        {matDetailList.map((item, index)=>{
                          return(<MenuItem key={index} value={item.serialNo}>{item.materialCode +"_"+item.serialNo}</MenuItem>)
                        })}
                      </Select>
                      </ListItemText>
                    </ListItem>
                    
                    <Divider component="li" />
                    <ListItem>
                      <ListItemText primary="Serial No." secondary={orderForm ? orderForm.serialNo : ""} />
                      <ListItemText primary="Product Description" secondary="M108" />
                      <ListItemText primary="Qty." secondary="1" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
