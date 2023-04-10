export type coin = {
	id: string
	symbol: string
	name: string
	image: string
	current_price: number
	market_cap: number
	market_cap_rank: number
	fully_diluted_valuation: number
	total_volume: number
	high_24h: number
	low_24h: number
	price_change_24h: number
	price_change_percentage_24h: number
	market_cap_change_24h: number
	market_cap_change_percentage_24h: number
	circulating_supply: number
	total_supply: number
	max_supply: number
	ath: number
	ath_change_percentage: number
	ath_date: string
	atl: number
	atl_change_percentage: number
	atl_date: string
	roi: number | null
	last_updated: string
	price_change_percentage_1h_in_currency: number
	price_change_percentage_24h_in_currency: number
	price_change_percentage_30d_in_currency: number
	price_change_percentage_7d_in_currency: number
}

export type coinView = {
	market_cap_rank: number
	id: string
}

// export type coin = {
// 	id: string
// 	image: string
// 	market_cap_rank: number
// 	price_change_percentage_24h: number
// 	price_change_percentage_7d_in_currency: number
// 	price_change_percentage_30d_in_currency: number
// 	price_change_percentage_1h_in_currency: number
// 	current_price: number
// 	market_cap: number
// 	total_volume: number
// 	market_data: {
// 		price_change_percentage_24h: number
// 		price_change_percentage_7d: number
// 		price_change_percentage_30d: number
// 		price_change_percentage_1h_in_currency: {
// 			usd: number
// 		}
// 		market_cap_rank: number
// 		total_volume: {
// 			usd: number
// 		}
// 		current_price: {
// 			usd: number
// 		}
// 		market_cap: {
// 			usd: number
// 		}
// 		ath_change_percentage: {
// 			usd: number
// 		}
// 	}
// 	name: string
// 	symbol: string
// 	links: {
// 		homepage: string
// 		blockchain_site: string[]
// 		subreddit_url: string
// 		repos_url: {
// 			github: string[]
// 		}
// 	}
// 	tickers: {}[]
// 	liked: boolean
// 	description: {
// 		en: string
// 	}
// }

export type coinViewType = {
	image: {
		small: string
		thumb: string
	}
	links: {
		homepage: string[]
		blockchain_site: string
		subreddit_url: string
		repos_url: {
			github: string[]
		}
	}
	name: string
	symbol: string
	market_data: {
		current_price: {
			usd: number
		}
		price_change_percentage_24h: number
		price_change_percentage_7d: number
		ath_change_percentage: {
			usd: number
		}
		total_volume: {
			usd: number
		}
		market_cap: {
			usd: number
		}
	}
	description: {
		en: string
	}
	tickers: any[]
	id: any
}

export type global = {
	data: {
		total_market_cap: {
			usd: number
		}
		market_cap_change_percentage_24h_usd: number
	}
}

export type sortParamType = {
	type: string
	direction: string
}

export type like = {
	id: string
	data: {
		userRef: string
		coinId: string
	}
}

export type order = {
	id: string
	data: {
		coin: string
		coinId: string
		image: string
		imageLarge: string
		price: number
		spent: number
		timestamp: string
		type: string
		userRef: string
	}
}

export type newOrder = {
	coin: string
	spent: number
	price: number
}
