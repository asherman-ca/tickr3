'use client'
import { useEffect, useState } from 'react'
import { coinType, likeType } from '../utils/types'
import { getUserLikes } from '../utils/fetchers'
import { useSession } from 'next-auth/react'

const CoinTable = ({ coins }: { coins: coinType[] }) => {
	// const { data } = useSession()
	const [likes, setLikes] = useState<likeType[]>([])

	useEffect(() => {
		const fetchLikes = async () => {
			const likes = await getUserLikes()
			setLikes(likes)
		}
		fetchLikes()
	}, [])

	console.log(likes, 'likes')

	return <div>CoinTable</div>
}

export default CoinTable
