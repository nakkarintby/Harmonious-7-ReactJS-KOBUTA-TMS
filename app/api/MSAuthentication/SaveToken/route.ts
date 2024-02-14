'use server'

import { cookies } from "next/headers"

export async function POST (req: Request){
    const cookie = cookies()
    var body = await req.json()
    cookie.set("token", body["token"])
    return new Response()
}