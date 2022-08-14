import { NextApiRequest, NextApiResponse } from "next";
import { cleanupPasswords } from "../../utils/deletePassword";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_SECRET_KEY}`) {
        const { deleted } = await cleanupPasswords();
        res.status(200).json({ success: true, deleted });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ statusCode: 500, message: err.message });
      } else {
        res.status(500).json({ statusCode: 500, message: "Unknown error" });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
