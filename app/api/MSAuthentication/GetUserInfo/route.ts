'use server'

import { cookies } from "next/headers"

export async function GET (req: Request) {
    const cookie = cookies()
    var result = cookie.get("userInfo")
    return new Response(JSON.stringify({response:result}))
}