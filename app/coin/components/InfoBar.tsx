'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const getCoinLikes = async (coinId: string) => {
	const res = await axios.get('/api/like/getCoinLikes')
	return res.data
}

function InfoBar({ coinId }: { coinId: string }) {
	const { data, error, isLoading } = useQuery({
		queryFn: () => getCoinLikes(coinId),
		queryKey: ['coinLikes'],
	})

	console.log('data', data)

	return <div>InfoBar</div>
}

export default InfoBar
