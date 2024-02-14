'use server'
import { NextRequest } from "next/server";
import { HttpAuthGet } from "../../RequestFunction";
import { RedirectType, redirect } from "next/navigation";

export async function GET(req:Request, { params }: { params: { userName: string, token:string } }) {
    var request = await HttpAuthGet(`User/GetByUserName?userName=${params.userName}`)
    return new Response(JSON.stringify({response: await request.json()}))
}

export async function POST(req:Request, { params }: { params: { userName: string } }) {
    var body = await req.json()
    var request = await HttpAuthGet(`User/GetByUserName?userName=${params.userName}`, body["token"])
    console.log(JSON.parse(await request.json()))
    return new Response(JSON.stringify({response: await request.json()}))
}