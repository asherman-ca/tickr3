'use client'
import { useState, useMemo } from 'react'
import { coinTableType, likeType } from '../utils/types'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getStaticLikes, getUserLikes } from '../utils/fetchers'
import { useQuery } from '@tanstack/react-query'

const CoinTable = ({
	coins,
	initialLikes,
}: {
	coins: coinTableType[]
	initialLikes: likeType[]
}) => {
	const [sortParam, setSortParam] = useState<string>('')
	const { data: session }: any = useSession()

	const { data, error, isLoading } = useQuery({
		queryFn: () => getUserLikes(session.user.id),
		queryKey: ['userLikes'],
	})

	const displayCoins = useMemo(() => {
		if (data && !isLoading) {
			coins.map((coin) => {
				coin.liked = data.some((like) => like.coinId === coin.id)
				return coin
			})
			return coins
		}
		return coins
	}, [sortParam, initialLikes, data])

	console.log('coinLikes', data)

	return (
		<table className='w-full'>
			<thead>
				<tr className='text-md'>
					<th className='text-left'>#</th>
					<th className='text-left'>Name</th>
					<th className='text-right'>Price</th>
					<th className='text-right'>1h%</th>
					<th className='text-right'>24h%</th>
					<th className='text-right'>7d%</th>
					<th className='text-right'>Market Cap</th>
					<th className='text-right'>Volume(24h)</th>
				</tr>
			</thead>
			<tbody>
				{displayCoins.map((coin) => {
					return (
						<tr key={coin.id} className={`${coin.liked && 'text-red-500'}`}>
							<td className='text-left py-2'>{coin.market_cap_rank}</td>
							<td>
								<Link href={`/coin/${coin.id}`}>{coin.name}</Link>
							</td>
							<td className='text-right'>{coin.current_price}</td>
							<td className='text-right'>
								{coin.price_change_percentage_1h_in_currency}
							</td>
							<td className='text-right'>
								{coin.price_change_percentage_24h_in_currency}
							</td>
							<td className='text-right'>
								{coin.price_change_percentage_7d_in_currency}
							</td>
							<td className='text-right'>{coin.market_cap}</td>
							<td className='text-right'>{coin.total_volume}</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default CoinTable
