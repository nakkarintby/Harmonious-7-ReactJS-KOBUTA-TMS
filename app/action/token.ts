'use client'
import { IPublicClientApplication } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { AccessTokenResponse } from "react-aad-msal";
import { handleLogout } from "../api/MSAuthentication/AuthClientHandle";

export default async function GetTokenApi(instance: IPublicClientApplication) {
    const account = instance.getAllAccounts()[0]
      if(account == undefined) return undefined
      const accessTokenRequest = {
        scopes: ["user.read"],
        account: account,
      }
      /* instance.acquireTokenSilent(accessTokenRequest) */
      instance.acquireTokenSilent(accessTokenRequest)
      .then(function (accessTokenResponse) {
        // Acquire token silent success
        let accessToken = accessTokenResponse.accessToken;
        // Call your API with token
        return accessToken
      })
      .catch(function (error) {
        //Acquire token silent failure
        console.log(error);
        /* handleLogout(); */
      });
}

export async function SaveTokenCookie(instance: IPublicClientApplication) {
  const account = instance.getAllAccounts()[0]
  if(account == undefined) return undefined
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: account,
  }
  /* instance.acquireTokenSilent(accessTokenRequest) */
  instance.acquireTokenSilent(accessTokenRequest)
  .then(async function (accessTokenResponse) {
    // Acquire token silent success
    let accessToken = accessTokenResponse.accessToken;
    // Call your API with token
    if(accessToken == undefined) {
      return
    }
    try {
      var req = await fetch('/api/MSAuthentication/SaveToken', {method: "POST", 
    body:JSON.stringify({
      token: accessToken
    })})
      return accessToken
    }catch(error) {
      console.log(error)
    }
  })
  .catch(function (error) {
    //Acquire token silent failure
    handleLogout(instance)
    console.log(error);
    /* handleLogout(); */
  });

}

