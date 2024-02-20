'use server'
import { NextRequest } from "next/server";
import { RedirectType, redirect } from "next/navigation";
import { HttpAuthGet } from "../RequestFunction";

export async function GET(req:Request, { params }: { params: { userName: string, token:string } }) {
    var request = await HttpAuthGet(`User/GetSystemRoleList`)
    return new Response(JSON.stringify({response: await request.json()}))
}

