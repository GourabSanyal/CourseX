// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Course } from "db";

type CourseData = {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CourseData[] | ErrorObj>
) {
  try {
    // await ensureDbConnected();
    const { courseId } = req.query;
    const course: CourseData[] | null = await Course.findByIdAndUpdate(
      courseId,
      req.body,
      { new: true }
    );
    // const authHeader = req.headers.authorization;
    if (!course) {
      res
        .status(400)
        .json({
          message: "Was not able to update course, please try again",
          statusCode: 401,
        });
    } else {
      res.status(200).json(course);
    }

    // if (authHeader) {

    //   console.log("no auth header");
    //   const courses: Course[] = await Course.find({});
    //   console.log(courses);
    //   res.status(200).json(courses);
    // } else {
    //   res.status(400).json({ message: "error", statusCode: 401 });
    // }
  } catch (error) {
    console.log("error from updateCourse/[courseId] -> ", error);

    // res.status(500).json({ message: "message", statusCode: 500 });
  }
}
