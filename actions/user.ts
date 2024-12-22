"use server";

import db from "@lib/db";
import { registerSchema } from "@schemas/User";

export async function createUser(formData: FormData): Promise<any> {
  try {
    const validatedData = registerSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedData.success)
      return validatedData.error.flatten().fieldErrors;
  } catch (e) {
    console.error("Error:", e);

    return e;
  }

  return formData;
}
