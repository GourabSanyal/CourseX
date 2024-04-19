import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin, Course } from "db";
import { JwtPayload } from "jsonwebtoken";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await ensureDbConnected();
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      verifyTokenAndGetUser(token, async (user: JwtPayload | boolean) => {
        let email = (user as JwtPayload).email;
        let admin = await Admin.findOne({ email });
        let courses: Course[] = await Course.find({
          _id: { $in: admin.createdCourses },
        });
        if (!user) {
          res.json({
            message: "Auth token expired, please relogin to continue",
            statusCode: 403,
          });
        } else {
          if (!courses.length) {
            res.json({
              message: "You have not created any course yet!",
              statusCode: 200,
            });
          } else {
            res.json({ message: "This is all your courses", data: courses });
          }
        }
      });
    } else {
      res
        .status(400)
        .json({
          message: "No auth token available, login to continue",
          statusCode: 400,
        });
    }
  } catch (error) {
    res.json({
      message: "Error from api admin/your-coourses",
      statusCode: 401,
    });
  }
}
