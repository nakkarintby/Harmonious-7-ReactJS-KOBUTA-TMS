"use client";
import { ThemeProvider } from "@emotion/react";
import "./props/style.css";
import defaultTheme from "../ShipmentStatusUpdate/props/Theme";
import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { MenuApp } from "../constant/Menu/MenuObj";
import React, { useCallback, useEffect, useRef } from "react";
import NavbarMenuTheme from "../props/MenuThemeProps/NavbarMenuTheme";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IPublicClientApplication } from "@azure/msal-browser";
import { Box, Button, Divider, Drawer,  List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from 'next/link';
const axios = require("axios");
var _ = require("lodash");
// async function GetMenu(router: AppRouterInstance) {
//   let MenuData: MenuApp[] = [];

//   var req = await CallHttp("/api/GetMenu", { method: "GET" }, router);
//   if(req != undefined){
//   let data: [] = req["response"]["data"];
//   if (data != null) {
//     for (let i = 0; i < data.length; i++) {
//       let Injected: MenuApp = MenuAppConvert(data[i]);
//       if (Injected.menuGroup == "TMS") {
//         MenuData.push(Injected);
//       }
//     }
//   }

// }
// return MenuData;
// }



async function GetMenu (router : AppRouterInstance , instance : IPublicClientApplication){
  let MenuData: MenuApp[] = [];
  const account = instance.getAllAccounts()[0];
 
  if (account != undefined) {
    const accessTokenRequest = {
      scopes: ["user.read"],
      account: account,
    };
    let resultToken = await instance.acquireTokenSilent(accessTokenRequest);
     await axios.get(
      "https://d736apsi01-wa02skc.azurewebsites.net/User/GetMenuByUser",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + resultToken.accessToken,
        },
      }
    ).then(function (response: any) {
      _.forEach(response.data.data, function (value: any, key: any) {
        if(value.menuGroup == "TMS"){
        MenuData.push(value);
        }
      });
      return MenuData;
    })
    .catch(function (error: any) {
      return MenuData;
    });
    return MenuData;
  }
}

export default function Menu() {
  const router = useRouter();
  const { instance } = useMsal();
  let [Menu, setMenu] = React.useState<MenuApp[]>();
  let [menuWeb, setMenuWeb] = React.useState<MenuApp[]>();
  let [isMenu, setIsMenu] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLoop = useCallback(() => {
    setIsMenu(isMenu);
  }, [isMenu]);
  let result: MenuApp[] = [];


  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(true)}>
      <List>
        {Menu?.map((row, index) => (
          <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => {
               router.push(row.href);
              }}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary={row.nameTH} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {Menu?.map((v, index) => (
          <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => {
               router.push(v.href)
              }}>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={v.nameTH} />
              </ListItemButton>
         
          </ListItem>
        ))}
      </List> */}
    </Box>
  );




  useEffect(() => {
    if (result != null || result !== undefined) {
      const FetchMenu = async () => {
       await GetMenu(router,instance).then((x)=>
       {
      
        setMenu(x);
       }).catch((x)=>{
        setMenu([]);
       });
      };
      FetchMenu();
    }
  }, [handleLoop]);
  
  return (
    <AuthenticatedTemplate>
      <ThemeProvider theme={defaultTheme}>
        <NavbarMenuTheme CanPreviousBack={false} />
        {/* <Button onClick={toggleDrawer(true)}>Open Menu</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer> */}
        {/* <div className="menu-main-block">
            <div className='menu-button-group'>
                { Menu?.map((row, index)=>{
                    if(row.actionDisplay === true && row.canCheckDisplay === true){
                        return(
                            <div key={index} style={{margin: "10px"}} >
                                <a href={`${row.href}`} key={index} >
                                    <button className='menu-button-props' onClick={async()=>{}} key={index}>
                                        {row.nameTH}
                                    </button>
                                </a>
                            </div>)
                    }
                })}
              
            </div>
        </div> */}
      </ThemeProvider>
    </AuthenticatedTemplate>
  );
}
