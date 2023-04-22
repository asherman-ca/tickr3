import { sortParamType } from './types'
import { useMemo } from 'react'
import { coinType } from './types'

export const displayCoinsMemo = (
	coins: coinType[],
	loading: boolean,
	sortParam: { type: string; direction: string }
) => {
	return useMemo(() => {
		const { type, direction } = sortParam
		// coins.map((coin) => {
		// 	if (userLikes.includes(coin.id)) {
		// 		coin.liked = true
		// 		return coin
		// 	} else {
		// 		coin.liked = false
		// 		return coin
		// 	}
		// })

		if (sortParam.type === 'mcap') {
			if (sortParam.direction === 'desc') {
				return coins.sort((a, b) => {
					return a.market_cap_rank - b.market_cap_rank
				})
			} else {
				return coins.sort((a, b) => {
					return b.market_cap_rank - a.market_cap_rank
				})
			}
		} else if (type === '7d') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.price_change_percentage_7d_in_currency -
						a.price_change_percentage_7d_in_currency
					)
				})
			} else {
				return coins.sort((a, b) => {
					return (
						a.price_change_percentage_7d_in_currency -
						b.price_change_percentage_7d_in_currency
					)
				})
			}
		} else if (type === '24hr') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return b.price_change_percentage_24h - a.price_change_percentage_24h
				})
			} else {
				return coins.sort((a, b) => {
					return a.price_change_percentage_24h - b.price_change_percentage_24h
				})
			}
		} else if (type === '1hr') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return (
						b.price_change_percentage_1h_in_currency -
						a.price_change_percentage_1h_in_currency
					)
				})
			} else {
				return coins.sort((a, b) => {
					return (
						a.price_change_percentage_1h_in_currency -
						b.price_change_percentage_1h_in_currency
					)
				})
			}
		} else if (type === 'volume') {
			if (direction === 'desc') {
				return coins.sort((a, b) => {
					return b.total_volume - a.total_volume
				})
			} else {
				return coins.sort((a, b) => {
					return a.total_volume - b.total_volume
				})
			}
		}
	}, [coins, loading, sortParam])
}

export const handleSort = (
	type: string,
	sortParam: sortParamType,
	setSortParam: (argument: sortParamType) => void
) => {
	if (type === 'mcap') {
		if (sortParam.direction === 'desc' && sortParam.type === 'mcap') {
			setSortParam({ type: 'mcap', direction: 'asc' })
		} else {
			setSortParam({ type: 'mcap', direction: 'desc' })
		}
	} else if (type === '7d') {
		if (sortParam.direction === 'desc' && sortParam.type === '7d') {
			setSortParam({ type: '7d', direction: 'asc' })
		} else {
			setSortParam({ type: '7d', direction: 'desc' })
		}
	} else if (type === '24hr') {
		if (sortParam.direction === 'desc' && sortParam.type === '24hr') {
			setSortParam({ type: '24hr', direction: 'asc' })
		} else {
			setSortParam({ type: '24hr', direction: 'desc' })
		}
	} else if (type === '1hr') {
		if (sortParam.direction === 'desc' && sortParam.type === '1hr') {
			setSortParam({ type: '1hr', direction: 'asc' })
		} else {
			setSortParam({ type: '1hr', direction: 'desc' })
		}
	} else if (type === 'volume') {
		if (sortParam.direction === 'desc' && sortParam.type === 'volume') {
			setSortParam({ type: 'volume', direction: 'asc' })
		} else {
			setSortParam({ type: 'volume', direction: 'desc' })
		}
	}
}
