import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin, Course, User } from "db";
import { JwtPayload } from "jsonwebtoken";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

type Course = {
  _id: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

type ErrorObj = {
  message: string;
  statusCode: number;
};

type ResponseData =
  | {
      message: string;
      data: Course[] | null;
    }
  | ErrorObj;

  const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await ensureDbConnected();
    const session = await getSession({req})
    const token = await getToken({ req, secret})

    // console.log("session - purchased courses", session);
    // console.log("token - purchased courses", token);
    

    if(!session || !token){
      res.json({
        message: "Session expired, please relogin to continue",
        statusCode : 403
      })
    } else {
      const email = token?.email
      let loggedUser = await User.findOne({ email}).populate("purchasedCourses")
      const courses : Course[] = loggedUser.purchasedCourses

      if (!courses.length){
        res.json({
          message: "You have not bought any courses yet",
          statusCode : 200
        }) 
      } else {
        res.json({
          message: "These are all your courses",
          data : courses
        })
      }
    }
  } catch (error) {
    res.json({
      message: "Error from api user/purchased-courses",
      statusCode: 401,
    });
  }
}
