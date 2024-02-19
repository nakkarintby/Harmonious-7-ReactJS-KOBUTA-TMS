'use server'

import { cookies } from "next/headers"

export async function GET(req:Request){
    const cookie = cookies();
    var token = cookie.get("token");
    return new Response(JSON.stringify({response:token}))
}