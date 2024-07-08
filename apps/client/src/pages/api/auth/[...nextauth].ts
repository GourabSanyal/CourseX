import NextAuth from "next-auth/next";
import {
  Session,
  User,
  SessionStrategy,
  DefaultSession,
  NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { ensureDbConnected } from "@/lib/dbConnect";
import { JWT } from "next-auth/jwt";
import { Admin, User as UserDb } from "db";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      id:'admin-signin',
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        let error = false

        if (!email || !password) {
          error = true 
          throw new Error("Email and password are required");
        }
        ensureDbConnected()
        const dbUser = await Admin.findOne({email})
        try {
          if (!dbUser){
            throw new Error("No admin found with this given email")
          }
          if (password !== dbUser.password){
            throw new Error('Incorrect email or password')
          }

          return{
            id: dbUser._id.toString(),
            name : dbUser.username,
            email: dbUser.email,
            role : 'admin'
          }
        } catch (error) {
          
          console.log("auth error", error as string);
          return null
        }
      }
    })
  ] as Provider[],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await ensureDbConnected()
        
        return true; 
      } catch (error) {
        return false; 
      }
    },
    async jwt({
      token,
      user,
      account,
      profile,
      trigger,
    }: {
      token: JWT;
      user?: User;
      account?: any;
      profile?: any;
      trigger?: "signIn" | "signUp" | "update";
    }) {
      console.log("jwt user",{user, profile, token, trigger, account } )
      if (account?.provider === "google" && profile) {
        
        token.name = profile.name;
        token.picture = profile.picture;
        token.role = account.role as string;
        // console.log("setting role in jwt", token.role);
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      // console.log("final token", token)
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: User;
    }) {
      // console.log("signIn call back data",{ session, token, user } )
      console.log("session user",{user, session, token })
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string | null,
        email: token.email as string | null,
        image: token.picture as string | null,
        role: token.role as string | undefined,
      };
      // console.log("final session in session callback", session.user);
      return session;
    },
  },
};

export default NextAuth(authOptions);

declare module "next-auth" {
  interface User {
    name: string;
    role?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    role?: string;
  }
}


