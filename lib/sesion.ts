import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function getSession() {
  return getServerSession(authOptions);
}
