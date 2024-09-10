// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Course } from "db";
import { ensureDbConnected } from "@/lib/dbConnect";
import { Course as CourseTypes } from "shared-types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { secret } from "@/lib/config/secrets";
import { getToken } from "next-auth/jwt";
import { ErrorObj } from "shared-types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseTypes[] | ErrorObj>
) {
  try {
    // await ensureDbConnected();
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret });
    const { courseId } = req.query;
    if (
      (!session && !token) ||
      (session?.user.role !== "admin" && token?.role !== "admin")
    ) {
      res.json({
        message: "Session expired, please relogin to continue",
        statusCode: 403,
      });
    }
    const course: CourseTypes[] | null = await Course.findById(courseId);
    if (!course) {
      res.status(400).json({
        message: "Was not able to update course, please try again",
        statusCode: 401,
      });
    } else {
      res.status(200).json(course);
    }
  } catch (error) {
    console.log("error from updateCourse/[courseId] -> ", error);
  }
}
