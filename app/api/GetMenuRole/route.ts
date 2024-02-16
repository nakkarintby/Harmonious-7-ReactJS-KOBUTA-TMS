import { HttpAuthGet } from "../RequestFunction";

export async function GET(req:Request) {
    var request = await HttpAuthGet(`Menu/GetMenuRoleList?page=1&size=9999`)
    return new Response(JSON.stringify({response: await request.json()}))
}

export async function POST(req:Request) {
    var request = await fetch("", {method:"POST",headers:{}})
}