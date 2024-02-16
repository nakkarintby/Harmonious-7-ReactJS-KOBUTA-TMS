'use server'
export async function POST(req:Request) {
    var body = await req.json()
    var request = await fetch("/Order/GetOrderFormByMatCode",
    {method:"POST", body:body})

    if(request.status === 200) {
        return new Response(JSON.stringify(
            {response: 
                {   statusCode:request.status,
                    statusText:request.statusText, 
                    data:await request.json()}}))
    }
    return new Response(JSON.stringify({response:{statusCode:request.status, statusText:request.statusText}}))
}