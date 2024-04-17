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
    
  } catch (error) {}
}
