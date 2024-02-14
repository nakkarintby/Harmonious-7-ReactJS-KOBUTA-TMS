import { PublicClientApplication } from "@azure/msal-browser";
import { Component } from "react";
import { msalConfig } from "./api/MSAuthentication/authConfig"
import { MsalProvider, useMsal } from "@azure/msal-react";
import TopToolbar from "./ShipmentStatusUpdate/props/Toolbar";

const msalInstancea = new PublicClientApplication(msalConfig);
/* export const MsalInstance = instance

export function handleLogout() {
    instance.logoutPopup().catch(e => {
        console.log("Error")
    }).then((rs) => {
    })
} */

export default function MainFuntion(/* { Component, pageProps } */) {
    const { instance, inProgress } = useMsal();
    return (
    <MsalProvider instance={msalInstancea} >
        {/* <TopToolbar /> */}
        {/* <Component {...pageProps} /> */}
    </MsalProvider>
    )
}