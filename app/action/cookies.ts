'use server'
import { cookies } from 'next/headers'


export async function GetTokenCookie() {
    const cookie = cookies()
    let token = cookie.get("token")
    return token
}