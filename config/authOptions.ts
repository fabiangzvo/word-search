import { AuthOptions } from "next-auth";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import { getClient } from '@lib/db'
import Users from '@lib/models/user'

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(getClient()),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password)
          throw new Error('Email and password are required')

        const user = await Users.findOne({
          email: credentials.email,
        }).exec()
        if (!user) throw new Error('No user found with the provided email')

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) throw new Error('Invalid credentials')

        return {
          id: user?._id?.toString() ?? '',
          email: user.email ?? '',
          name: user.name ?? '',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }

      return token
    },
    async session({ session, token }) {
      if (!token) {
        return session
      }

      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
      }

      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}
