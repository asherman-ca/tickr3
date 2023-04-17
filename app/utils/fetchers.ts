import { coinView, likeType, globalType, coinType } from './types'
import axios from 'axios'

export const getStaticLikes = async (coinId: string): Promise<likeType[]> => {
	const res = await fetch(
		`${process.env.HOST_URL || 'http://localhost:3000'}/api/like/${coinId}`,
		{
			next: { revalidate: 0 },
		}
	)
	return await res.json()
}

export const getStaticCoin = async (coinId: string): Promise<coinView> => {
	const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
		next: { revalidate: 600 },
	})

	return await res.json()
}

export const getStaticCoins = async (): Promise<coinType[]> => {
	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d`,
		{
			next: { revalidate: 600 },
		}
	)
	return await res.json()
}

export const getStaticGlobal = async (): Promise<globalType> => {
	const res = await fetch('https://api.coingecko.com/api/v3/global', {
		next: { revalidate: 600 },
	})

	return await res.json()
}

export const getUserLikes = async (userId: string): Promise<likeType[]> => {
	const res = await axios.get(
		`${process.env.HOST_URL}/api/like/userLikes/${userId}`
	)
	return res.data
}

export const getCoinLikes = async (coinId: string): Promise<likeType[]> => {
	const res = await axios.get(
		`${process.env.HOST_URL || 'http://localhost:3000'}/api/like/${coinId}`
	)
	return res.data
}

export const addLike = async (coinId: string) => {
	const res = await axios.post(
		`${process.env.HOST_URL || 'http://localhost:3000'}/api/like/addLike`,
		{ coinId }
	)
	return res.data
}

export const removeLike = async (coinId: string) => {
	const res = await axios.post(
		`${process.env.HOST_URL || 'http://localhost:3000'}/api/like/removeLike`,
		{ coinId }
	)
	return res.data
}
