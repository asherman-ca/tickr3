// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const userId: string = req.query.slug as string
		console.log('userId', userId)

		try {
			const prismaUser = await prisma.user.findUnique({
				where: { id: userId },
				include: {
					orders: {
						orderBy: {
							createdAt: 'desc',
						},
					},
					likes: true,
				},
			})
			res.status(200).json(prismaUser)
		} catch (err) {
			res
				.status(403)
				.json({
					err: `Error has occured whilst fetching user. userId: ${userId}`,
				})
		}
	}
}
