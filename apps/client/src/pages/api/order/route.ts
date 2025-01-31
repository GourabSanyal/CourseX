import type { NextApiRequest, NextApiResponse } from "next";
import { ensureDbConnected } from "@/lib/dbConnect";
import { Admin, Course } from "db";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

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
const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await ensureDbConnected();
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret });
    
    if (!session && !token) {
        res.json({
          message: "Session expired, please relogin to continue",
          statusCode: 403,
        });
    } else {
        const { amount, currency } = await req.body as {
            amount : string,
            currency : string
        };

        const options = {

        }

    }
  } catch (error) {
    res.json({
      message: "Error from order/route",
      statusCode: 401,
    });
  }
}
