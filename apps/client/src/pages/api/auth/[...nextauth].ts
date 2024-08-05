import NextAuth from "next-auth";
import { Session, User, DefaultSession, NextAuthOptions } from "next-auth";
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
      id: "admin-signup",
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "text" },
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        ensureDbConnected();
        const username = credentials?.username;
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password || !username) {
          throw new Error("Email and password are required");
        }
        const dbUser = await Admin.findOne({ email });

        try {
          if (!dbUser) {
            const obj = { username, email, password, role: "admin" };
            console.log("password before saving", password);
            const newAdmin = await new Admin(obj);
            newAdmin.save();
            // console.log("new admin in cred provider  --> ", newAdmin);
            return {
              id: newAdmin._id.toString(),
              name: newAdmin.username,
              email: newAdmin.email,
              role: newAdmin.role,
            }
          } else {
            throw new Error("Admin Laready exists, please login to continue");
          }
        } catch (error) {
          console.log("auth error", error as string);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "admin-signin",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }
        ensureDbConnected();
        const dbUser = await Admin.findOne({ email, password });
        try {
          if (!dbUser) {
            throw new Error("No admin found with this given email");
          }
          if (password !== dbUser.get("password")) {
            throw new Error("Incorrect email or password");
          }

          return {
            id: dbUser._id.toString(),
            name: dbUser.username,
            email: dbUser.email,
            role: dbUser.role,
          };
        } catch (error) {
          console.log("auth error", error as string);
          return null;
        }
      },
    }),
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
        await ensureDbConnected();
        if (account?.provider === "google") {
          const dbUser = await UserDb.findOne({ email: profile?.email });

          if (!dbUser) {
            const user = new UserDb({
              email: profile?.email,
              username: profile?.name,
              role: "user",
            });

            await user.save();
            // console.log("user created successfully");
            
          }

          if (dbUser){
            account.role = dbUser.role;
          } else {
            account.role = "user"
          }
          // console.log("account before", account);
        }
        return true;
      } catch (error : any) {
        console.log("error in sign in callback", error);
        
        return false;
      }
    },
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: JWT;
      user?: User;
      account?: any;
      profile?: any;
    }) {
      if (account?.provider === "google" && profile) {
        token.name = profile.name;
        token.picture = profile.picture;
        token.role =  user?.role || "user";
        token.id = user?.id || null;
        console.log("Google sign-in: token after", JSON.stringify(token, null, 2));
      } else if (user){
        // console.log("user in else if -- > ", user);  
        token.id = user.id;      
        token.email = user?.email;
        token.name = user?.name;
        token.role = user?.role ||  'admin';
        console.log("User sign-in: token after", JSON.stringify(token, null, 2));
      }
      console.log("Final token in jwt callback:", JSON.stringify(token, null, 2));
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
      // console.log("Token in session callback:", JSON.stringify(token, null, 2));
      session.user = {
        ...session.user,
        id: token.id as string,
        name: token.name as string | null,
        email: token.email as string | null,
        role: token.role as string,
      };
      // console.log("Final session in session callback:", JSON.stringify(session, null, 2));

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
      // image: string | null;
      role: string | null;
    } & DefaultSession["user"];
  }
  interface JWT {
    role?: string;
  }
}
