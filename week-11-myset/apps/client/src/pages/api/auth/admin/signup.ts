// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin } from "db";
import jwt from "jsonwebtoken";

type Data = {
  username: string;
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
  const { username, email, password } = req.body;

  let admin = await Admin.findOne({ email });

  if (admin) {
    res.status(409).json({ message: "Admin already exist" });
  } else {
    const obj = { username: username, email: email, password: password };
    const newAdmin = new Admin(obj);
    newAdmin.save();
    const token = jwt.sign({ email, role: "admin" }, "SECRET", {
      expiresIn: "3h",
    });
    res.status(201).json({ message: "Admin created successfully", token });
  }
}
