import { PublicClientApplication } from "@azure/msal-browser";
import { Component } from "react";
import { msalConfig } from "./api/MSAuthentication/authConfig"
import { MsalProvider } from "@azure/msal-react";
import TopToolbar from "./pages/driver/Toolbar";

export const msalInstancea = new PublicClientApplication(msalConfig);

export default function MainFuntion(/* { Component, pageProps } */) {
    return (
        <>
            <MsalProvider instance={msalInstancea} >
                {/* <TopToolbar /> */}
                {/* <Component {...pageProps} /> */}
            </MsalProvider>
            
        </>
    )
}