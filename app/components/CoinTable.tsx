'use client'
import { useState, useMemo } from 'react'
import { coinTableType, likeType } from '../utils/types'

const CoinTable = ({
	coins,
	initialLikes,
}: {
	coins: coinTableType[]
	initialLikes: likeType[]
}) => {
	const [sortParam, setSortParam] = useState<string>('')

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
