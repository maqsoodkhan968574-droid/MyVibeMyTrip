import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

const myVibeAdminEmail = process.env.MYVIBE_ADMIN_EMAIL ?? "admin@myvibemytrip.com";
const myVibeAdminPassword = process.env.MYVIBE_ADMIN_PASSWORD ?? "8809155543@MVMT";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    newUser: "/dashboard"
  },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        if (credentials.email === myVibeAdminEmail && credentials.password === myVibeAdminPassword) {
          return {
            id: "myvibe-admin",
            name: "Harsh Raj",
            email: myVibeAdminEmail,
            image: null,
            role: "ADMIN"
          };
        }

        try {
          const user = await prisma.user.findUnique({ where: { email: credentials.email } });
          if (!user?.passwordHash) return null;
          const valid = await bcrypt.compare(credentials.password, user.passwordHash);
          if (!valid) return null;
          return { id: user.id, name: user.name, email: user.email, image: user.image, role: user.role };
        } catch {
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? ""
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};
