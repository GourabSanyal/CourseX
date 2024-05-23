// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { JwtPayload } from "jsonwebtoken";
import { Admin, User } from "db";

type UserData = {
  _id: string;
};

type ErrorObj = {
  message: string;
  statusCode: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData | ErrorObj>
) {
  try {
    await ensureDbConnected();
    const { email, role } = req.body;
    console.log("role", role)
    // if ( role == "admin"){
    //     const foundUser = await Admin.findOne({email})
    //     const adminId : UserData = {
    //         _id : foundUser._id
    //     }
    //     res.status(200).json(adminId)
    // } else if (role == "user") {
    //     const foundUser = await User.findOne({email})
    //     const userId : UserData = {
    //         _id : foundUser._id
    //     }
    //     res.status(200).json(userId)
    // }

  } catch (error) {
    console.log("error from api -> ", error);
    res.status(500).json({ message: "message", statusCode: 500 });
  }
}
