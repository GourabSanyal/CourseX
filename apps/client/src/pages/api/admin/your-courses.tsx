import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin, Course } from "db";
import { JwtPayload } from "jsonwebtoken";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import jwt from "next-auth/jwt";

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
    const session = await getSession({ req });
    const token = await getToken({ req, secret });
    console.log("JSON Web Token", token);
    if (!session && !token || session?.user.role !=="admin" && token?.role !== "admin" ) {
      res.json({
        message: "Session expired, please relogin to continue",
        statusCode: 403,
      });
    } else {
      console.log("session presenst");
      const email= token?.email;
      const role= token?.role;

      let admin = await Admin.findOne({ email, role });
      let courses: Course[] = await Course.find({
        _id: { $in: admin.createdCourses },
      });
      if (!courses.length) {
        res.json({
          message: "You have not created any course yet!",
          statusCode: 200,
        });
      } else {
        res.json({ message: "This is all your courses", data: courses });
      }
    }
  } catch (error) {
    res.json({
      message: "Error from api admin/your-courses",
      statusCode: 401,
    });
  }
}
