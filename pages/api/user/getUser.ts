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
		const session = await getServerSession(req, res, authOptions)
		if (!session)
			return res.status(401).json({ message: 'please sign in to fetch user' })

		try {
			const prismaUser = await prisma.user.findUnique({
				where: { email: session?.user?.email! },
				include: {
					orders: {
						orderBy: {
							createdAt: 'desc',
						},
					},
				},
			})
			res.status(200).json(prismaUser)
		} catch (err) {
			res.status(403).json({ err: 'Error has occured whilst fetching user' })
		}
	}
}
