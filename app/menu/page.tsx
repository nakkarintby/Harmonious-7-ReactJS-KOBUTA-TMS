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
  console.log(account)
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

export default function Menu() {
  const router = useRouter();
  const { instance } = useMsal();
  let [Menu, setMenu] = React.useState<MenuApp[]>();
  let [isMenu, setIsMenu] = React.useState(false);
  const handleLoop = useCallback(() => {
    setIsMenu(isMenu);
  }, [isMenu]);
  let result: MenuApp[] = [];
  useEffect(() => {
    if (result != null || result !== undefined) {
      const FetchMenu = async () => {
       await GetMenu(router,instance).then((x)=>
       {
        console.log("RS:")
        console.log(x)
        setMenu(x);
       }).catch((x)=>{
        setMenu([]);
       });
      };
      FetchMenu();
    }
  }, [handleLoop]);
  // localStorage.setItem('UserName', 'Pongthep')
  // localStorage.setItem('UserTransport', 'SKC')
  return (
    <AuthenticatedTemplate>
      <ThemeProvider theme={defaultTheme}>
        <NavbarMenuTheme CanPreviousBack={false} />
        <div className="menu-main-block">
          <div className="menu-button-group">
            {Menu?.map((row, index) => {
              if (row.menuGroup == "TMS") {
                if (
                  row.actionDisplay === true &&
                  row.canCheckDisplay === true
                ) {
                  return (
                    <div key={index}>
                      <a href={`${row.href}`} key={index}>
                        <button
                          className="menu-button-props"
                          onClick={async () => {}}
                          key={index}
                        >
                          {row.nameTH}
                        </button>
                      </a>
                    </div>
                  );
                }
              }
            })}
          </div>
        </div>
      </ThemeProvider>
    </AuthenticatedTemplate>
  );
}
