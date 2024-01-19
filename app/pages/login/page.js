/* 'use client'
import { PublicClientApplication , LogLevel } from "@azure/msal-browser";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useState } from "react";
import { msalConfig } from "../../api/MSAuthentication/authConfig";
import Button from '@mui/material/Button';

export default function Login() {
    const { instance } = useMsal();
    const [userDetail, setuserDetail] = useState(null);
    async function handleLogin() {
        instance.loginPopup(msalConfig).catch(e => {
            console.log("Error", e)
        }).then((response) => {
            console.log("LOGIN", response)
            setuserDetail({ name: response?.account?.name, token: response?.accessToken })
        })
    }

    function handleLogout() {
        instance.logoutPopup(msalConfig).catch(e => {
            console.log("Error")
        }).then((rs) => {
        })
    }

    return (
        <center>
            Azure Login
            <AuthenticatedTemplate>
                <h6>logout</h6>
                {userDetail && (<>Name : {userDetail.token}</>)}
                <button onClick={() => handleLogout()}>LogOut</button>
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h6>login</h6>
                <button onClick={() => handleLogin()}>LogIn</button>
            </UnauthenticatedTemplate>
            
        </center>

    )

} */