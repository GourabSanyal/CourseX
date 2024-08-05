import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Admin, Course } from "db";
import { JwtPayload } from "jsonwebtoken";

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
      data: Course | null;
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
        if (!user) {
          const errorResponse: ErrorObj = {
            message: "Auth token expired",
            statusCode: 403,
          };
          res.status(403).json(errorResponse);
        } else {
          const course = new Course(req.body);
          console.log("user", user);
          
          await course.save()

          // get admin email from user object
          let adminEmail = (user as JwtPayload).email

          //update admins created course array
          await Admin.findOneAndUpdate({ email : adminEmail }, { $push : {createdCourses : course._id}})
          res
            .status(201)
            .json({ message: "Course created successfully", data: course });
        }
      });
    } else {
      res.status(400).json({ message: "No auth token available, login to continue", statusCode: 400 });
    }
  } catch (error) {
    console.error("Error creating course:", error);
    res
      .status(500)
      .json({
        message: "Failed to add course, please try again",
        statusCode: 500,
      });
  }
}
