import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Razorpay from "razorpay";
import { ErrorObj } from "shared-types";

type ResponseData =
  | {
      message?: string;
      orderID?: string;
      statusCode?: number;
    }
  | ErrorObj;
const secret = process.env.NEXTAUTH_SECRET;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret });
    console.log("api error -> ", req.body);
    try {
      if (!session && !token) {
        res.json({
          message: "Session expired, please relogin to continue",
          statusCode: 403,
        });
      } else {
        const { amount, currency } = (await req.body) as {
          amount: string;
          currency: string;
        };

        var options = {
          amount: amount,
          currency: currency,
          receipt: "rcp1",
        };

        const order = await razorpay.orders.create(options);
        console.log(order);

        return res.status(200).json({
          orderID: order.id,
        });
      }
    } catch (error) {
      res.json({
        message: "failed to complete payment",
        statusCode: 400,
      });
    }
  } catch (error) {
    res.json({
      message: "Error from order/route",
      statusCode: 401,
    });
  }
}
