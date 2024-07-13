// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin, Course } from "db";
import { JwtPayload } from "jsonwebtoken";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

type Course = {
  _id: string; // You can adjust this type as needed
  title: string;
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

    await ensureDbConnected();
    const session = await getSession({ req });
    const token = await getToken({ req, secret });
    console.log("JSON Web Token", token);
    if (!session && !token ) {
      res.json({
        message: "Session expired, please relogin to continue",
        statusCode: 403,
      });
    } else {
      let courses: Course[] = await Course.find({});
      if (!courses.length) {
        res.json({
          message: "You have not created any course yet!",
          statusCode: 200,
        });
      } else {
        res.json({ message: "This is all courses", data: courses });
      }
    }

    // const authHeader = req.headers.authorization;
    // if (authHeader) {
    //   const token = authHeader.split(" ")[1];
    //   verifyTokenAndGetUser(token, async (user: JwtPayload | boolean) => {
    //     if (!user) {
    //       const errorResponse: ErrorObj = {
    //         message: "Auth token expired",
    //         statusCode: 403,
    //       };
    //       res.status(403).json(errorResponse);
    //     } else {
    //       const courses: Course[] = await Course.find({});
    //       res.status(200).json(courses);
    //     }
    //   });
    // } else {
    //   res.status(400).json({ message: "error", statusCode: 401 });
    // }
  } catch (error) {
    console.log("error from api -> ", error);

    res.status(500).json({ message: "message", statusCode: 500 });
  }
}
