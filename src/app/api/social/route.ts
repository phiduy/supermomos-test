import type { NextApiRequest, NextApiResponse } from "next"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: Request) {
  return new Response("Hello, Next.js!")
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method
  const body = JSON.parse(req.body)
  switch (requestMethod) {
    case "POST":
      res
        .status(200)
        .json({ message: `You submitted the following data: ${body}` })

    // handle other HTTP methods
    default:
      res.status(200).json({ message: "Welcome to API Routes!" })
  }
}
