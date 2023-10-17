// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin } from "db";
import jwt from "jsonwebtoken";

type Data = {
 email:string,
 password: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await ensureDbConnected();
  const { email, password } = req.body;
  let username = email;
  console.log("username - password ->", username, password);
  
  let admin = await Admin.findOne({ username })
  console.log('from route -->', req.body);
  
  if (admin){
    res.status(403).json({ message : "Admin already exist"})
  }
  else {
    const obj = { username : username , password : password}
    const newAdmin = new Admin(obj)
    newAdmin.save()
    const token = jwt.sign({ username, role : 'admin' }, "SECRET", { expiresIn : '3h'})
    res.json({ message : "Admin created successfully", token})
  }
}
