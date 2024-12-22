import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db, { client } from "@lib/db";
import { compare } from "bcrypt";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(client.connect()),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with the provided email");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // Return the user object (can include additional properties)
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (!token) {
        return session;
      }

      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
      };

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

// Crear el handler para NextAuth
const handler = NextAuth(authOptions);

// Exportar los métodos HTTP necesarios
export { handler as GET, handler as POST };
