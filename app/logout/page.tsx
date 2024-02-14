'use client'
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { GetUserInfo } from "../api/MSAuthentication/AuthClientHandle";

export default function Logout() {
    const router = useRouter()
    const { instance, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    if(isAuthenticated) {
        console.log("ABRAMMMMM   " + isAuthenticated)
        instance.logout({postLogoutRedirectUri:"http://localhost:3000",})
        /* const RemoveCredential = fetch("/api/MSAuthentication/RemoveAccountData", {method:"GET"})
        const logoutProcess = async () =>
        {
            let userInfo = await GetUserInfo()
            const account = instance.getAccountByUsername(userInfo.userName)
            instance.logout(
            {
                account:account, 
                postLogoutRedirectUri:"http://localhost:3000", 
                logoutHint:account!.idTokenClaims?.login_hint
            })
        }
        logoutProcess() */
    }
    useEffect(()=>{
        router.push("/")
    })
}

