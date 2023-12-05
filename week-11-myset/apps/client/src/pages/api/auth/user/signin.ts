// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { User } from "db";
import jwt from "jsonwebtoken";

type Data = {
  email: string;
  password: string;
};

type responseData = {
  message: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | responseData>
) {
  await ensureDbConnected();
  const { email, password } = req.body;
  let username = email;
  let user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign(
      { username: username, password: password },
      "SECRET",
      {
        expiresIn: "3h",
      }
    );
    res.status(200).json({ message : "Login in successful", token})
    // console.log("user  --> ",user)
  } else {
    res.status(403).json({ message : "User login failed, please try again!"})
  }
}
