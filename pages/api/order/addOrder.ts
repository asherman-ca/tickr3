// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions)
	console.log('session', session)
	console.log('req.body', req.body)
	if (req.method === 'POST') {
		try {
			const data = await prisma.order.create({
				data: {
					coinId: req.body.coinId,
					userId: session.user.id,
					image: req.body.image,
					amount: req.body.amount,
					price: req.body.price,
					type: req.body.type,
					symbol: req.body.symbol,
				},
			})
			res.status(200).json(data)
		} catch (err) {
			res.status(403).json({
				err: `Error has occured while liking post userId: ${session.user.id}, coinId: ${req.body.coinId}`,
			})
		}
	}
}
