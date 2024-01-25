// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin } from "db";
import jwt from "jsonwebtoken";

type Data = {
  email: string;
  password: string;
};

type responseData = {
  message: string;
  token?: string;
};

type ErrorObj = {
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | responseData>
) {
  await ensureDbConnected();
  const { email, password } = req.body;
  let username = email;
  let admin = await Admin.findOne({ username, password });
  if(admin) {
    const token = jwt.sign({username: username, role : "admin"},"SECRET",{
      expiresIn: "3h"
    } )
    res.status(200).json({ message: "Admin logged in", token})

  } else {
    res.status(403).json({ message : "Admin not found, please sign up to continue"})
  }
}
