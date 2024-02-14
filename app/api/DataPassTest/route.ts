'use server'

import { cookies } from "next/headers"

export async function POST(req: Request) {
    const cookie = cookies()
    cookie.set("Key", "Test")
    return new Response(JSON.stringify({response : "NANTE"}))
}