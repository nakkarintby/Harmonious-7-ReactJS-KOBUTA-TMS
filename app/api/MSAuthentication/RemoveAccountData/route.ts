'use server'

import { cookies } from "next/headers"

export async function GET() {
    const cookie = cookies()
    cookie.delete("token")
    cookie.delete("userInfo")
    return new Response()
}