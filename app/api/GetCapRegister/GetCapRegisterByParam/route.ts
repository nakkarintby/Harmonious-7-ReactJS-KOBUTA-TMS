"use server";

import { GetTokenCookie } from "../../../action/cookies";
import { HttpAuthPost } from "../../RequestFunction";

export async function POST(req: Request) {
  var body = await req.json();
  const token =  await GetTokenCookie()
  var request = await HttpAuthPost(
    `/CapacityRegister/GetCapacityRegisterByParam`,token?.value,undefined , body
  );

  if (request.status === 200) {
    return new Response(
      JSON.stringify({
        response: {
          statusCode: request.status,
          statusText: request.statusText,
          data: await request.json(),
        },
      })
    );
  }
  return new Response(
    JSON.stringify({
      response: { statusCode: request.status, statusText: request.statusText },
    })
  );
}

///Shipment/GetFormByMatCode?matcode=${body["matCode"]}
