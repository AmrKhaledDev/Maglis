import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/Auth/Login.schema";
import bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
// ===============================================
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(data) {
        try {
          const validation = LoginSchema.safeParse(data);
          if (!validation.success) return null;
          const existingUser = await prisma.user.findUnique({
            where: {
              email: validation.data.email,
            },
          });
          if (!existingUser || !existingUser.password) return null;
          if (!existingUser.emailVerified) return null;
          const checkPassword = await bcrypt.compare(
            validation.data.password,
            existingUser.password,
          );
          if (!checkPassword) return null;
          const { password, ...user } = existingUser;
          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
