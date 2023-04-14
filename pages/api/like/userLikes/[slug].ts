// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../prisma/client'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const data = await prisma.like.findMany({
				where: {
					userId: req.query.slug as string,
				},
			})
			res.status(200).json(data)
		} catch (err) {
			res.status(403).json({ err: 'Error has occured whilst fetching likes' })
		}
	}
}
