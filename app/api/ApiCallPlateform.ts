'use client'

import { IPublicClientApplication } from "@azure/msal-browser"
import { MenuApp, MenuAppConvert } from "../constant/Menu/MenuObj"
import { useMsal } from "@azure/msal-react";
import { handleLogout } from "./MSAuthentication/AuthClientHandle";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";




export async function CallHttp(CallPath:string, initRequest:RequestInit, router:AppRouterInstance) {
    var req = await fetch(CallPath, initRequest)
    var response = JSON.parse(await req.text())
    let ApiInfo = await response["response"]
    let ApiInfoStatus = ApiInfo["status"]
    if(ApiInfoStatus == 'client-error'){
        let ApiInfoError = ApiInfo['error']
        if(ApiInfoError['code'] == 'unauthorized-user'){
            console.log('unauthorized-user')
            router.replace('/logout')
            return
        }
    }
    return response
}

export async function CallHttp2(CallPath:string, initRequest:RequestInit, router:AppRouterInstance) {
    var req = await fetch(CallPath, initRequest)
    var result = JSON.stringify(await req.json())
    var resultObject = JSON.parse(result)
    var resultResponse = resultObject.response
    /* console.log(resultObject.response.statusCode) */
    if(resultResponse.statusCode === 401) {
        console.log('unauthorized-user')
        router.replace('/logout')
        return
    }else if (resultResponse.statusCode === 200) {

        return new Response(JSON.stringify(
            {response:
                {   statusCode:resultResponse.statusCode, 
                    statusText:resultResponse.statusText,
                    data:resultResponse.data
                }}))
    } 

    return new Response(JSON.stringify({response:{statusCode:resultResponse.statusCode, statusText:resultResponse.statusText}}))
}

// handleLogout()