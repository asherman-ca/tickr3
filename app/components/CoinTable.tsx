'use client'
import { useEffect, useState, useMemo } from 'react'
import { coinTableType, likeType } from '../utils/types'
import { getUserLikes } from '../utils/fetchers'
import { useSession } from 'next-auth/react'

const CoinTable = ({
	coins,
	initialLikes,
}: {
	coins: coinTableType[]
	initialLikes: likeType[]
}) => {
	// const { data: session } = useSession() as any
	// const [likes, setLikes] = useState<likeType[]>([])
	const [sortParam, setSortParam] = useState<string>('')

	// useEffect(() => {
	// 	if (session) {
	// 		const fetchLikes = async () => {
	// 			const likes = await getUserLikes(session.user.id)
	// 			setLikes(likes)
	// 		}

	// 		fetchLikes()
	// 	}
	// }, [session])

	const displayCoins = useMemo(() => {
		return coins
	}, [sortParam])

	return (
		<div>
			{displayCoins.map((coin) => {
				return (
					<div key={coin.id} className={`${coin.liked && 'text-red-500'}`}>
						{coin.name}
					</div>
				)
			})}
		</div>
	)
}

export default CoinTable
