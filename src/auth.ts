import NextAuth, { Session } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { getAccountByUserId } from "@/data/account";

import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmations";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (!twoFactorConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },
    async session({ session, token }: { session: Session; token?: any }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.isOAuth = token.isOAuth;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);

      if (!user) return token;

      const account = await getAccountByUserId(user.id);

      token.name = user.name;
      token.email = user.email;
      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;
      token.isOAuth = !!account;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
