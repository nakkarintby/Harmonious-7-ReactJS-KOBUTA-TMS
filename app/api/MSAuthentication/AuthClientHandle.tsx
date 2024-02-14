'use client'
import { IPublicClientApplication } from "@azure/msal-browser"
import { AuthenticatedTemplate, useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useRouter } from "next/navigation";
import { useEffect, version } from "react";
import { UserInformation, UserInformationConvert } from "../../constant/UserInfo/UserInformation";
import { CallHttp } from "../ApiCallPlateform";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";


export function handleLogout(instance: IPublicClientApplication) {
    instance.logoutRedirect({postLogoutRedirectUri:"http://localhost:3000"}).catch(e => {
        console.log("Error")
    }).then((rs) => {
    })
}

function RedirectToLogin() {
    const router = useRouter()
    router.push("/menu")
}

export function IsAuthenticationTemplate({ children }:{children: React.ReactNode}) {
    const router = useRouter()
    const { instance, inProgress } = useMsal();
    const isAuthenticated = useIsAuthenticated();
    if(isAuthenticated === false){
        if(isAuthenticated === false){
            /* RedirectToLogin() */
        }
    }
    useEffect(()=>{
        /* if(isAuthenticated === 'false'){
            console.log("Auth?" + isAuthenticated)
            router.push("/")
       } */
      })
    return(
    <>
        <AuthenticatedTemplate>
            { children }
        </AuthenticatedTemplate>
    </>)
}

export async function GetUserLoggedData(instance: IPublicClientApplication, router:AppRouterInstance){
    const account = instance.getAllAccounts()[0]
    if(account == undefined) return undefined
    const accessTokenRequest = {
      scopes: ["user.read"],
      account: account,
    }
    let resultToken = await instance.acquireTokenSilent(accessTokenRequest)
    var reqUserInfo = await CallHttp(`/api/GetUserInfo/${account.username}`, 
    {method:"POST", 
    body:JSON.stringify({token:resultToken.accessToken})}, router)
    /* var response = JSON.stringify(reqUserInfo)
    var responseConvert = JSON.parse(JSON.parse(response.toString())) */
    let UserInfo:UserInformation = UserInformationConvert(reqUserInfo["response"]["data"])
    return UserInfo
}

export async function SaveUserInfo(source:UserInformation) {
    var request = await fetch("/api/MSAuthentication/SaveUserInfo", 
    {method:"POST", 
    body:JSON.stringify({data:source})})
}

export async function GetUserInfo() {
    var req = await fetch("/api/MSAuthentication/GetUserInfo", {method:"GET"})
    var response = JSON.parse(await req.text())
    var UserInfoString = JSON.parse(response["response"]["value"])
    var ConverResponse:UserInformation = UserInformationConvert(UserInfoString)
    return ConverResponse
}