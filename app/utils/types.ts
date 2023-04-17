export type coinType = {
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

type likedType = {
	liked: boolean
}

export type coinTableType = coinType & likedType

export type marketType = {
	base: string
	target: string
	market: {
		name: string
		identifier: string
	}
	last: number
	volume: number
	converted_volume: {
		usd: number
		btc: number
		eth: number
	}
	trust_score: string
	coin_id: string
	target_coin_id: string
	trade_url: string
}

export type coinView = {
	id: string
	name: string
	symbol: string
	market_cap_rank: number
	description: {
		en: string
	}
	links: {
		homepage: string[]
		blockchain_site: string[]
		repos_url: {
			github: string[]
		}
		subreddit_url: string
	}
	image: {
		thumb: string
		small: string
		large: string
	}
	genesis_date: string
	market_data: {
		current_price: {
			usd: number
		}
		ath_change_percentage: {
			usd: number
		}
		ath_date: {
			usd: string
		}
		market_cap: {
			usd: number
		}
		total_volume: {
			usd: number
		}
		price_change_percentage_1h_in_currency: {
			usd: number
		}
		price_change_percentage_24h_in_currency: {
			usd: number
		}
		price_change_percentage_7d_in_currency: {
			usd: number
		}
	}
	tickers: marketType[]
}

export type sessionType = {
	user: {
		id: string
		name: string
		email: string
		image: string
	}
	expires: string
}

export type likeType = {
	coinId: string
	userId: string
	id: string
}

export type globalType = {
	data: {
		total_market_cap: {
			usd: number
		}
		market_cap_change_percentage_24h_usd: number
		markets: number
		active_cryptocurrencies: number
		total_volume: {
			usd: number
		}
		market_cap_percentage: {
			btc: number
			eth: number
		}
	}
}

export type exchangeType = {
	id: string
	name: string
	year_established: number
	country: string
	description: string
	url: string
	image: string
	has_trading_incentive: boolean
	trust_score: number
	trust_score_rank: number
	trade_volume_24h_btc: number
	trade_volume_24h_btc_normalized: number
}
