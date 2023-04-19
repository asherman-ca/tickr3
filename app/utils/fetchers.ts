import { coinView, likeType, globalType, coinType, exchangeType } from './types'
import axios from 'axios'

export const getStaticLikes = async (coinId: string): Promise<likeType[]> => {
	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/like/${coinId}`,
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
	const json = await res.json()
	if (json.error) {
		return []
	} else {
		return json
	}
}

export const getStaticGlobal = async (): Promise<globalType> => {
	const res = await fetch('https://api.coingecko.com/api/v3/global', {
		next: { revalidate: 600 },
	})

	return await res.json()
}

export const getUserLikes = async (userId: string): Promise<likeType[]> => {
	const res = await axios.get(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/like/userLikes/${userId}`
	)
	return res.data
}

export const getCoinLikes = async (coinId: string): Promise<likeType[]> => {
	const res = await axios.get(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/like/${coinId}`
	)
	return res.data
}

export const addLike = async (coinId: string) => {
	const res = await axios.post(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/like/addLike`,
		{
			coinId,
		}
	)
	return res.data
}

export const removeLike = async (coinId: string) => {
	const res = await axios.post(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/like/removeLike`,
		{
			coinId,
		}
	)
	return res.data
}

// Exchange API

export const getStaticExchanges = async (): Promise<exchangeType[]> => {
	const res = await fetch(
		`https://api.coingecko.com/api/v3/exchanges?per_page=40`,
		{
			next: { revalidate: 600 },
		}
	)
	const json = await res.json()
	if (json.error) {
		return []
	} else {
		return json
	}
}

// Order API

export const addOrder = async (orderData: any) => {
	const res = await axios.post(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/order/addOrder`,
		{
			...orderData,
		}
	)
	return res.data
}

export const getOrders = async (): Promise<any[]> => {
	const res = await axios.get(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/order/getOrders`
	)
	return res.data
}

// User API

export const getUser = async (): Promise<any> => {
	const res = await axios.get(
		`${
			process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'
		}/api/user/getUser`
	)
	return res.data
}
