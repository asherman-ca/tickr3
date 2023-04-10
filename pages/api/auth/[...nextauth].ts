import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../prisma/client'

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session(params) {
			// Send properties to the client, like an access_token and user id from a provider.
			// session.accessToken = token.accessToken
			// session.user.id = token.id

			// return session
			// console.log(params)
			params.session.user.id = params.user.id
			return params.session
		},
	},
}

export default NextAuth(authOptions)
