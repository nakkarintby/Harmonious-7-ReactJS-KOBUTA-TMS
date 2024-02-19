'use server'
import { NextRequest } from "next/server";
import { HttpAuthGet, HttpAuthPost } from "../../RequestFunction";
import { RedirectType, redirect } from "next/navigation";

export async function GET(req:Request, { params }: { params: { id: string, token:string } }) {
    var request = await HttpAuthGet(`User/GetById?userId=${params.id}`)
    return new Response(JSON.stringify({response: await request.json()}))
}


export async function POST(req:Request) {
    var body = await req.json()
    var request = await HttpAuthPost(`User/GetById`, body["token"])
    console.log(JSON.parse(await request.json()))
    return new Response(JSON.stringify({response: await request.json()}))
}
