import { getServerSession } from "next-auth/next";
import { authOptions } from "@config/authOptions";

export async function getSession() {
  return getServerSession(authOptions);
}
