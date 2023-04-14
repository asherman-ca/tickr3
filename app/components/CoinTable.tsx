'use client'
import { useEffect, useState } from 'react'
import { coinType, likeType } from '../utils/types'
import { getUserLikes } from '../utils/fetchers'
import { useSession } from 'next-auth/react'

const CoinTable = ({
	coins,
	initialLikes,
}: {
	coins: coinType[]
	initialLikes: likeType[]
}) => {
	const { data: session } = useSession() as any
	const [likes, setLikes] = useState<likeType[]>([])

	useEffect(() => {
		if (session) {
			const fetchLikes = async () => {
				const likes = await getUserLikes(session.user.id)
				setLikes(likes)
			}

			fetchLikes()
		}
	}, [session])

	console.log(initialLikes, 'initialLikes')

	console.log(likes, 'likes')

	return <div>CoinTable</div>
}

export default CoinTable
