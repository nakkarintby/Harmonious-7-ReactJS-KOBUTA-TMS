'use server'
import { RedirectType, redirect } from 'next/navigation'
import { GetTokenCookie } from "../action/cookies"
import { protocol, address, port } from "../constant/NetworkSetting"

export type RequestApiInfo = { ApiPath:string, header?:{ [index:string]:any } , body?:{ [index:string]:any }}
var UrlAddress = `${protocol}://${address}/`


export async function HttpGet(path:string, header?:{ [index:string]:any }) {
    var url = `${UrlAddress}${path}`
    var headerValue:{[index:string]:any} = {}
    for(let key in header) {
        var value = header[key];
        headerValue[key] = value
    }
    var request = await fetch(url, 
        { method:"GET", 
        headers: headerValue})
    return request
}

export async function HttpAuthGet(path:string, tokenParams?:string, header?:{ [index:string]:any }) {
    let token:string|undefined = ""
    if(tokenParams !== undefined) {
        token = tokenParams
    }else{
        let resultToken = await GetTokenCookie()
        token = resultToken?.value
    }
    var url = `${UrlAddress}${path}`
    var headerValue:{[index:string]:any} = {}
    headerValue["Authorization"] = `Bearer ${token}`
    for(let key in header) {
        var value = header[key];
        headerValue[key] = value
    }
    var request = await fetch(url, 
        { method:"GET", 
        headers: headerValue})
    return request
    
}

export async function HttpPost(path:string, initRequest:RequestInit) {
    var url = `${UrlAddress}${path}`

    var headerValue:BodyInit  = JSON.stringify({})
    var bodyValue:{[index:string]:any} = {}
    var response = await fetch(url, bodyValue)
    return response
}

export async function HttpAuthPost(path:string, tokenParams?:string, header?:{ [index:string]:any }, body?:{ [index:string]:any }) {
    let token:string|undefined = ""
    if(tokenParams !== undefined) {
        token = tokenParams
    }else{
        let resultToken = await GetTokenCookie()
        token = resultToken?.value
    }
    var url = `${UrlAddress}${path}`
    var headerValue:{[index:string]:any} = {}
    var bodyValue:{[index:string]:any} = {}
    headerValue["Authorization"] = `Bearer ${token}`
    headerValue["Content-Type"] = "application/json"
    for(let key in header) {
        var value = header[key];
        headerValue[key] = value
    }
    for(let key in body) {
        var value = body[key]
        bodyValue[key] = value
    }
    var response = await fetch(url, 
        { method:"POST", 
        headers: headerValue,
        body: JSON.stringify(body)
        })
    return response
}
