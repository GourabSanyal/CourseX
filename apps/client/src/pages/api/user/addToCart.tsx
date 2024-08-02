import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin, Course, User } from "db";
import { JwtPayload } from "jsonwebtoken";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
      inCart : boolean;
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
      console.log("req.body", req.body);
      console.log("email", token?.email);
      
      const userEmail = token?.email;
      const courseId = req.body.courseId;

      // Find the user by email and update the cart with the new courseId
    const user = await User.findOneAndUpdate(
      { email: userEmail },
      // { $push: { cart: courseId } },
      // { new: true, runValidators: true } // `new: true` to return the updated document
    );

    const isInCart = user.cart.includes(courseId)

    if (isInCart){
      user.cart.pull(courseId)
    } else {
      user.cart.push(courseId)
    }

    await user.save()

    res.json({
      message: isInCart ? "Items removed from cart" :  "Item added to cart",
      success: true,
      inCart : isInCart ? false : true
    });

    }
  } catch (error) {
    console.log("error in add to cart API", error);

    res.status(500).json({
      message: "Error from api user/purchased-courses",
      success: false,
    });
  }
}
