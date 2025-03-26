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
    await ensureDbConnected();
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret });
    // const { courseId } = req.query;

    const course: CourseTypes = req.body;
    console.log("course in update card api -> ", course);

    if (
      (!session && !token) ||
      (session?.user.role !== "admin" && token?.role !== "admin")
    ) {
      return res.json({
        message: "Session expired, please relogin to continue",
        statusCode: 403,
      });
    }
    const updatedCourse = await Course.findByIdAndUpdate(course._id, course, {
      new: true,
    });
    console.log("updated course -> ", updatedCourse);
    if (!updatedCourse) {
      return res.status(400).json({
        message: "Was not able to update course, please try again",
        statusCode: 401,
      });
    } else {
      return res.status(200).json(updatedCourse);
    }
  } catch (error) {
    console.log("error from updateCourse/[courseId] -> ", error);
    return res.status(500).json({
      message: "Internal server error",
      statusCode: 500,
    });
  }
}
