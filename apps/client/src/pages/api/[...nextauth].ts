import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers";
import { Provider } from "next-auth/providers";
import { ensureDbConnected } from "@/lib/dbConnect";
import { JWT } from "next-auth/jwt";
import { Admin, User } from "db";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // providers : [
    //     GoogleProvider({

    //     })
    // ]
}

export default NextAuth(authOptions);

