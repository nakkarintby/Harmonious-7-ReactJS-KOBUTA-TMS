'use server'

import { headers } from "next/headers"
import { HttpPost } from "../RequestFunction"

export async function POST(req:Request) {
    var body = await req.json()
    var request = await HttpPost(`Order/GetOrderFormByMatCode`, {method:"POST", body:body} )
}