'use server'
import { InteractionStatus, PublicClientApplication } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { cookies } from "next/headers";

const cookie = cookies()

export async function deleteCookie() {
    
    if (cookie.get("msal.interaction.status")){
        try {
            cookie.delete("msal.interaction.status")
        }
        catch(error) {
            console.log(error)
        }
        
    }
}

