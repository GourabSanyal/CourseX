import type { NextApiRequest, NextApiResponse } from 'next'
import { ensureDbConnected } from "@/lib/dbConnect";
import { Admin } from "db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      await ensureDbConnected();
      const user = await Admin.findOne({ email });
        if (!user){
            return res.status(200).json({errorType : "no_user", message : " Admin does not exist, please recheck the email or signup to continue"});
        } else {
            res.status(200).json({errorType : "user_exist", message : "Wrong password, please try again"})
        }
    } catch (error) {
      console.error('Error checking user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}