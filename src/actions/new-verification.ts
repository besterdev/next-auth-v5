"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
  const existToken = await getVerificationTokenByToken(token);

  if (!existToken) return { error: "Token does nit exist! ❌" };

  const hasExpired = new Date() > new Date(existToken.expires);

  if (hasExpired) return { error: "Token has expired! ❌" };

  const existingUser = await getUserByEmail(existToken.email);

  if (!existingUser) return { error: "User does not exist! ❌" };

  await db.user.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existToken.email },
  });

  await db.verificationToken.delete({
    where: { id: existToken.id },
  });

  return { success: "Email verified! 🎉" };
};
