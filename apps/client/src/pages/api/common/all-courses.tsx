// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { Course, Admin, User } from "db";
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
      inCart?: Course[] | null;
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

    // Check if the request is from the marquee
    const isMarqueeRequest = req.headers['x-request-source'] === 'marquee';

    if (isMarqueeRequest) {
      const courses = await Course.find({ });
      return res.json({
        message: "All published courses for marquee",
        data: courses,
      });
    }

    // For authenticated requests, proceed with normal flow
    if (!session && !token) {
      return res.status(403).json({
        message: "Session expired, please relogin to continue",
        statusCode: 403,
      });
    }

    let courses: Course[] = await Course.find({});
    const email = token?.email;

    let loggedUser;

    if (token?.role === "admin") {
      loggedUser = await Admin.findOne({ email });
      return res.json({
        message: "add courses for admin",
        data: courses,
      });
    } else {
      loggedUser = await User.findOne({ email }).populate("cart");
      return res.json({
        message: "All courses for user",
        data: courses,
        inCart: loggedUser.cart,
      });
    }
  } catch (error) {
    console.log("error from api -> ", error);
    return res.status(500).json({ message: "Error in Server, try again", statusCode: 500 });
  }
}
