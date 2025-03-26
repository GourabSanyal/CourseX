import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { Admin, Course } from "db";
import { ResponseData } from "shared-types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { getToken } from "next-auth/jwt";
import { secret } from "@/lib/config/secrets";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed", data: null });
  }
  await ensureDbConnected();
  console.log("delete route : ", req.body);
  const { _id: courseId } = req.body;
  if (!courseId) {
    return res
      .status(400)
      .json({ message: "Course ID is required", data: null });
  }
  const session = await getServerSession(req, res, authOptions);
  const token = await getToken({ req, secret });

  if (
    (!session && !token) ||
    (session?.user.role !== "admin" && token?.role !== "admin")
  ) {
    return res.status(403).json({
      message: "Session expired, please relogin to continue",
      data: null,
    });
  }

  try {
    const admin = await Admin.findOneAndUpdate(
      { createdCourses: courseId },
      { $pull: { createdCourses: courseId } },
      { new: true }
    );

    if (!admin) {
      return res
        .status(400)
        .json({ message: "Course not found in Admin records", data: null });
    }

    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(400).json({ message: "Course not found", data: null });
    }

    res.status(200).json({
      message: "Course deleted successfully",
      data: courseId,
    });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      message: "Failed to delete course, please try again",
      statusCode: 500,
    });
  }
}
