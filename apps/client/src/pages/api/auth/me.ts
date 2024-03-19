// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";

type Data = {
  role: string | null;
  username :  string | null;
  email : string | null
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await ensureDbConnected();
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verifyTokenAndGetUser(token, (user: any) => {
      if (!user) {
        res.status(403).json({
          role: "",
          username : '',
          email : ''
        });
        return
      }
      const { role, username , email } = user
      res.json({ role, username, email });
    });
  } 
  else {
    res.status(403).json({ role : null, username: null, email: null})
  }
}
