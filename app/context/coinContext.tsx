'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { coin, global } from '../utils/types'

interface AppContextInterface {
	coins: coin[]
	global: global
	loading: boolean
}
const CoinContext = createContext<AppContextInterface | null>(null)

export const CoinContextProvider = ({ children }: any) => {
	let [coins, setCoins] = useState<coin[]>([])
	let [global, setGlobal] = useState<global>({
		data: {
			total_market_cap: {
				usd: 0,
			},
			market_cap_change_percentage_24h_usd: 0,
		},
	})
	let [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const makeApiCalls = async () => {
			try {
				// const coinsRef = await fetch(
				// 	`https://api.coingecko.com/api/v3/coins?per_page=200`
				// );
				const coinsRef = await fetch(
					`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d`
				)
				const globalRef = await fetch(`https://api.coingecko.com/api/v3/global`)

				const responses = await Promise.all([coinsRef.json(), globalRef.json()])
				setCoins(responses[0])
				setGlobal(responses[1])
			} catch (error) {
				console.log('COIN CONTEXT FETCH ERROR:', error)
			}
			setLoading(false)
		}

		makeApiCalls()
	}, [])

	return (
		<CoinContext.Provider value={{ coins, loading, global }}>
			{children}
		</CoinContext.Provider>
	)
}

export const CoinsData = () => {
	return useContext(CoinContext) as AppContextInterface
}
