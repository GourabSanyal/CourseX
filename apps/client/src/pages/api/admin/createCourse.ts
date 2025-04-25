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
  try {
    await ensureDbConnected();
    console.log("called update route");
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret });

    if (
      (!session && !token) ||
      (session?.user.role !== "admin" && token?.role !== "admin")
    ) {
      return res.json({
        message: "Session expired, please relogin to continue",
        statusCode: 403,
      });
    }

    const adminEmail = token?.email;
    const course = new Course(req.body);

    await course.save();

    await Admin.findOneAndUpdate(
      { email: adminEmail },
      { $push: { createdCourses: course._id } }
    );

    res
      .status(201)
      .json({ message: "Course created successfully", data: course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({
      message: "Failed to add course, please try again",
      statusCode: 500,
    });
  }
}
