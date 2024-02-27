"use client";
import "./style.css";
import { useMsal } from "@azure/msal-react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { handleLogout } from "../../api/MSAuthentication/AuthClientHandle";
import { IPublicClientApplication } from "@azure/msal-browser";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MenuApp } from "../../constant/Menu/MenuObj";
import MenuIcon from "@mui/icons-material/Menu";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
const axios = require("axios");
var _ = require("lodash");

async function GetMenu(
  router: AppRouterInstance,
  instance: IPublicClientApplication
) {
  localStorage.setItem("UserName", "");
  let MenuData: MenuApp[] = [];
  const account = instance.getAllAccounts()[0];
  localStorage.setItem("UserName", account.username);
  if (account != undefined) {
    const accessTokenRequest = {
      scopes: ["user.read"],
      account: account,
    };
    let resultToken = await instance.acquireTokenSilent(accessTokenRequest);
    await axios
      .get("https://d736apsi01-wa02skc.azurewebsites.net/User/GetMenuByUser", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + resultToken.accessToken,
        },
      })
      .then(function (response: any) {
        _.forEach(response.data.data, function (value: any, key: any) {
          MenuData.push(value);
        });
        return MenuData;
      })
      .catch(function (error: any) {
        return MenuData;
      });
    return MenuData;
  }
}

export default function NavbarMenuTheme({
  CanPreviousBack,
}: {
  CanPreviousBack: boolean;
}) {
  const router = useRouter();
  const { instance, inProgress } = useMsal();
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );
  const [openMenu, setOpenMenu] = React.useState(false);
  let [Menu, setMenu] = React.useState<MenuApp[]>();
  let [isMenu, setIsMenu] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenMenu(newOpen);
  };
  const handleLoop = useCallback(() => {
    setIsMenu(isMenu);
  }, [isMenu]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  let result: MenuApp[] = [];

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(true)}>
      <List>
        <ListItem>
          <Typography>{localStorage.getItem("UserName")}</Typography>
        </ListItem>
        {Menu?.map((row, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => {
                router.push(row.href);
              }}
            >
              <ListItemIcon>
                {row.code == "CAPREGIS" ? (
                  <LocalShippingIcon />
                ) : row.code == "ORDERPICKUP" ? (
                  <DepartureBoardIcon />
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText primary={row.nameTH} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (result != null || result !== undefined) {
      const FetchMenu = async () => {
        await GetMenu(router, instance)
          .then((x) => {
            setMenu(x);
          })
          .catch((x) => {
            setMenu([]);
          });
      };
      FetchMenu();
    }
  }, [instance]);

  return (
    <>
      <div className="NavBar">
        <Drawer open={openMenu} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <ul className="NavLink-Group">
          <li className="NavLink-List">
            <Button onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: "white", fontSize: 32 }} />
            </Button>
          </li>
          <li className="NavLink-List">
            <a aria-describedby={id} onClick={handleClick}>
              <SettingsIcon sx={{ color: "white", fontSize: 32 }} />
            </a>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <a
                onClick={() => {
                  router.push("/logout");
                }}
              >
                <Typography sx={{ p: 2 }}>Logout</Typography>
              </a>
            </Popover>
          </li>
        </ul>
      </div>
    </>
  );
}
