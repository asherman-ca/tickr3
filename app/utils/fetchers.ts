import { coinView, likeType, globalType } from './types'
import axios from 'axios'

export const getStaticLikes = async (coinId: string): Promise<likeType[]> => {
	const res = await fetch(
		`${process.env.HOST_URL || 'http://localhost:3000'}/api/like/${coinId}`,
		{
			next: { revalidate: 300 },
		}
	)
	return await res.json()
}

export const getStaticCoin = async (coinId: string): Promise<coinView> => {
	const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
		next: { revalidate: 300 },
	})

	return await res.json()
}

export const getStaticGlobal = async (): Promise<globalType> => {
	const res = await fetch('https://api.coingecko.com/api/v3/global', {
		next: { revalidate: 300 },
	})

	return await res.json()
}

export const getCoinLikes = async (coinId: string) => {
	const res = await axios.get(`/api/like/${coinId}`)
	return res.data
}

export const addLike = async (coinId: string) => {
	const res = await axios.post('/api/like/addLike', { coinId })
	return res.data
}
