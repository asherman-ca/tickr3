'use client'
import { useState, useMemo } from 'react'
import { coinTableType, likeType } from '../utils/types'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getUserLikes } from '../utils/fetchers'
import { useQuery } from '@tanstack/react-query'
import Loader from './Loader'
import { moneyParse, numParseTwoDecimal } from '../utils/parsers'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const CoinTable = ({
	coins,
	initialLikes,
}: {
	coins: coinTableType[]
	initialLikes: likeType[]
}) => {
	const [sortParam, setSortParam] = useState<{
		direction: string
		type: string
	}>({ direction: 'desc', type: 'market_cap' })
	const { data: session }: any = useSession()

	const { data, error, isLoading, isFetching }: any = useQuery({
		queryFn: () => getUserLikes(session?.user.id),
		queryKey: ['userLikes'],
	})

	const parsedCoins = useMemo(() => {
		if (data?.length > 0 && !isLoading) {
			coins.map((coin) => {
				coin.liked = data.some((like: likeType) => like.coinId === coin.id)
				return coin
			})
			return coins
		} else {
			return coins
		}
	}, [data])

	const displayCoins = useMemo(() => {
		return parsedCoins
	}, [parsedCoins, sortParam])

	if (isFetching) {
		return <Loader />
	}

	// TODO: get rid of react-query and if session then raw fetch likes from useEffect on every mount to fix like-change bug
	// or see if SWR invalidation works

	return (
		<table className='w-full'>
			<thead>
				<tr className='border-gray-200 border-b border-t'>
					<th className='py-2'>
						{/* <StarIcon height={14} width={14} className='' /> */}
					</th>
					<th className='text-left py-4'>#</th>
					<th className='text-left '>Name</th>
					<th className='text-right '>Price</th>
					<th className='text-right '>1h%</th>
					<th className='text-right '>24h%</th>
					<th className='text-right '>7d%</th>
					<th className='text-right '>Market Cap</th>
					<th className='text-right pr-2'>Volume(24h)</th>
				</tr>
			</thead>
			<tbody>
				{displayCoins.map((coin) => {
					return (
						<tr
							key={coin.id}
							className='hover:bg-blue-50 border-b border-gray-200'
						>
							<td className='pl-2'>
								{coin.liked ? (
									<SolidStarIcon height={14} width={14} color={'gold'} />
								) : (
									<StarIcon height={14} width={14} />
								)}
							</td>
							<td className='text-left py-6'>{coin.market_cap_rank}</td>
							<td>
								<Link
									href={`/coin/${coin.id}`}
									className='font-medium flex items-center gap-1'
								>
									<Image
										src={coin.image}
										height={24}
										width={24}
										alt={coin.name}
									/>
									<div>
										{coin.name}{' '}
										<span className='text-slate-500 font-normal'>
											{coin.symbol.toUpperCase()}
										</span>
									</div>
								</Link>
							</td>
							<td className='text-right font-medium'>
								{moneyParse(coin.current_price)}
							</td>
							<td
								className={`text-right ${
									coin.price_change_percentage_1h_in_currency > 0
										? 'text-green-500'
										: 'text-red-500'
								}`}
							>
								{numParseTwoDecimal(
									coin.price_change_percentage_1h_in_currency
								)}
								%
							</td>
							<td
								className={`text-right ${
									coin.price_change_percentage_24h_in_currency > 0
										? 'text-green-500'
										: 'text-red-500'
								}`}
							>
								{numParseTwoDecimal(
									coin.price_change_percentage_24h_in_currency
								)}
								%
							</td>
							<td
								className={`text-right ${
									coin.price_change_percentage_7d_in_currency
										? 'text-green-500'
										: 'text-red-500'
								}`}
							>
								{numParseTwoDecimal(
									coin.price_change_percentage_7d_in_currency
								)}
								%
							</td>
							<td className='text-right'>{moneyParse(coin.market_cap)}</td>
							<td className='text-right pr-2'>
								{moneyParse(coin.total_volume)}
							</td>
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

export default CoinTable
