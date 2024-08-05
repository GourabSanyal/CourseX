// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { Course } from "db";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type Course = {
  _id: string;
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
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret });
    if (!session && !token) {
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
  } catch (error) {
    console.log("error from api -> ", error);
    res.status(500).json({ message: "message", statusCode: 500 });
  }
}
