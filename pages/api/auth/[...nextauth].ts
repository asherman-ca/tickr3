import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../prisma/client'
import { sessionType } from '@/app/utils/types'

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
		async session({ session, user }: any) {
			if (session.user) {
				session.user.id = user.id
				return session
			} else {
				return session
			}
		},
	},
}

export default NextAuth(authOptions as any)
