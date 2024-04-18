import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin, Course } from "db";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await ensureDbConnected()
    const { email } = req.body;
    // console.log(email);
    
    let admin = await Admin.findOne({ email });
    let courses: Course[] = await Course.find({
      _id: { $in: admin.createdCourses },
    });
    // console.log("admin", admin, "courses", courses);
    
    if (!courses.length) {
      res.json({
        message: "You have not created any course yet!",
        statusCode: 200,
      });
    } else {
      res.json({ message: "This is all your courses", data: courses });
    }
  } catch (error) {
    res.json({
      message: "Error from api admin/your-coourses",
      statusCode: 401,
    });
  }
}
