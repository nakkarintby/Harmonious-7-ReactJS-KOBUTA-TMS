import { NextRequest, NextResponse } from "next/server"
import { HttpAuthGet, HttpAuthPost, HttpGet } from "../RequestFunction"
import path from "path";
import { request } from "http";
import { headers } from "next/headers";

type ApiInfo = {token:String, protocol:String, address:String, path:String}

export async function GET(request:Request) {
    var requests = await HttpAuthGet("api/Case");
    return requests
}

export async function POST(req: Request) {
    var body = await req.json()
    var requests = await HttpAuthPost("api/Case/SelectCaseRelatedUser", undefined, body);
    return new Response(JSON.stringify({response : await requests.json()}))
}