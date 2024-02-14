'use server'

import { HttpGet } from "../RequestFunction"

export async function POST(req:Request) {
    var body = await req.json()
    var request = await HttpGet(`/Order/GetFormByMatCodeForTest?matcode=${body["matCode"]}`)
    /* var requestJson = await request.json()
    console.log(await request.json()) */
    if(request.status === 200) {
        return new Response(JSON.stringify(
            {response: 
                {   statusCode:request.status,
                    statusText:request.statusText, 
                    data:await request.json()}}))
    }
    return new Response(JSON.stringify({response:{statusCode:request.status, statusText:request.statusText}}))
    
}

///Shipment/GetFormByMatCode?matcode=${body["matCode"]}