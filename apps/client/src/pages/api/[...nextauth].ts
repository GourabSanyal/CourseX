import NextAuth from "next-auth/next";
import {Session, User} from 'next-auth'
import { CredentialsProvider } from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { ensureDbConnected } from "@/lib/dbConnect";
import { JWT } from "next-auth/jwt";
import { Admin, User as UserDb } from "db";

import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: "openid email profile"
                }
            }
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await ensureDbConnected()
                if (!credentials) {
                    return null;
                } 
                const username = credentials.username;
                const password = credentials.password;
                // Add logic here to look up the user from the credentials supplied
                const admin = await Admin.findOne({ username });

                if (!admin) {
                    const obj = { username: username, password: password };
                    const newAdmin = new Admin(obj);
                    let adminDb = await newAdmin.save();
                    console.log("admin db ->", adminDb);
                    
                    return {
                        id: adminDb._id,
                        email: adminDb.username,
                    }
                } else {
                    //TODO:: Make this safer, encrypt passwords
                    if (admin.password !== password) {
                        return null
                    }
                    // User is authenticated
                    console.log("admin db ->", admin);
                    return {
                        id: admin._id,
                        email: admin.username,
                    }
                }
            }
        }),
    ] as Provider[],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        encryption: true
    },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }: { token: JWT, user?: User, account?: any, profile?: any, isNewUser?: boolean }) {
            if (account?.provider === "google" && profile) {
                token.name = profile.name;
                token.picture = profile.picture;
            }
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name; // Add name to token
            }
            return token;
        },
        async session({ session, token, user }: { session: Session, token: JWT, user: User }) { ;
            token.name= session.user?.name; // Add name to session
            return session;
        },
    },
}

export default NextAuth(authOptions);

