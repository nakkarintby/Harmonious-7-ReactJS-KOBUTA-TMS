'use server'

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        console.log("HttpTESTESTEST")
    } else {
      // Handle any other HTTP method
    }
  }