"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import * as z from "zod";

import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields! ❌",
    };
  }

  return { success: "Email sent! 🎉" };
};
