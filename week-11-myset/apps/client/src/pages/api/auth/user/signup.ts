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
  message: string,
  token?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data |responseData >
) {
  await ensureDbConnected();
  const { username, password } = req.headers;

  let user = await User.findOne({ username });

  if (user) {
    res.status(403).json({ message: "User already exist" });
  } else {
    const obj = { username: username, password: password };
    const newUser = new User(obj);
    newUser.save();
    const token = jwt.sign({ username, role: "admin" }, "SECRET", {
      expiresIn: "3h",
    });
    res.json({ message: "User registered successfully", token });
  }
}
