import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { User, Course } from "db";
import mongoose from "mongoose";

type Course = {
  _id: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

type ErrorObj = {
  message: string;
  success: boolean;
};

type ResponseData =
  | {
      message: string;
      success: boolean;
    }
  | ErrorObj;

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await ensureDbConnected();
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret });

    if (!session || !token) {
      res.json({
        message: "Session expired, please relogin to continue",
        success: false,
      });
    } else {
      const userEmail = token?.email;
      const incomingCart = Object.values(req.body.cart);
      const user = await User.findOne({ email: userEmail });

      const isCartEmpty = Object.keys(incomingCart).length === 0;
      if (isCartEmpty) {
        user.cart = [];
        await user.save();
        res.json({
          message: "Cart is cleared",
          success: true,
        });
      } else {
        const incomingcartIds = incomingCart.map((item: any) => item._id);
        const courses = await Course.find({
          _id: { $in: incomingcartIds },
        });
        if (courses.length !== incomingcartIds.length) {
          return res.status(400).json({
            message: "One or more courses not found",
            success: false,
          });
        }

        const incomingCartSet = new Set(
          incomingCart.map((id: any) => id.toString())
        );
        user.cart = courses.map((course) => course._id);
        await user.save();

        res.json({
          message: "Cart data updated",
          success: true,
        });
      }
    }
  } catch (error) {
    console.log("error in sync to cart API", error);

    res.status(500).json({
      message: "Error from api sync cart",
      success: false,
    });
  }
}
