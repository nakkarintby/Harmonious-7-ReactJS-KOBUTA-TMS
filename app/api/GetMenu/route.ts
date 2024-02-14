'use server'
import { HttpGet, HttpAuthGet } from "../RequestFunction";

export async function GET(req:Request) {
    var request = await HttpAuthGet("User/GetMenuByUser")
    return new Response(JSON.stringify({response: await request.json()}))
    /* let testFuu = JSON.stringify(request)   */
    /* console.log(testFuu) */
    
    // return new Response(JSON.stringify({response:await request.json()}))
}
