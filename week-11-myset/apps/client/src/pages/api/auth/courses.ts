// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { verifyTokenAndGetUser } from "@/lib/verifyTokenAndGetUser";
import { Course } from "db";

type Course = {
  _id: string; // You can adjust this type as needed
  title: string;
  description: string;
  price: number;
  imageLink: string;
  published: boolean;
};

type Data = {
  courses: Course[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  try {
    await ensureDbConnected();
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      verifyTokenAndGetUser(token, async (user: string) => {
        if (!user) {
          res.status(403).json({ message: "Auth token expired" });
        } else {
          const courses: Course[] = await Course.find({});
          res.status(200).json([{ courses }]);
        }
      });
    } else {
      res.status(401).json({ message: "Database connection error" });
    }
  } catch (error) {
    console.log("error from api -> ", error);

    res.status(500).json({ error: "Internal Server Error hahas" });
  }
}
