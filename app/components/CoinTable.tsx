'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { getUserLikes } from '../utils/fetchers'
import { useQuery } from '@tanstack/react-query'
import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid'

import { coinTableType, likeType } from '../utils/types'
import { moneyParse, numParseTwoDecimal } from '../utils/parsers'
import Loader from './Loader'
import Image from 'next/image'
import Pagination from './Pagination'
import { displayCoinsMemo, handleSort } from '../utils/actions'
const rowsPerPageOptions = [10, 25, 50, 100]

const CoinTable = ({ coins }: { coins: coinTableType[] }) => {
	const [sortParam, setSortParam] = useState<{
		direction: string
		type: string
	}>({ direction: 'desc', type: 'mcap' })
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

	const displayCoins = displayCoinsMemo(
		parsedCoins,
		isFetching,
		sortParam
	) as coinTableType[]

	const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageOptions[1])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const lastPage =
		displayCoins.length % rowsPerPage === 0
			? displayCoins.length / rowsPerPage
			: Math.floor(displayCoins.length / rowsPerPage) + 1

	const updateRowsPerPage = (rowsNumber: number) => {
		setRowsPerPage(rowsNumber)
		setCurrentPage(1)
	}

	const nextPage = () => {
		if (currentPage === lastPage) return
		setCurrentPage((prev) => prev + 1)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	const prevPage = () => {
		if (currentPage === 1) return
		setCurrentPage((prev) => prev - 1)
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	if (session && isFetching) {
		return <Loader />
	}

	// TODO: get rid of react-query and if session then raw fetch likes from useEffect on every mount to fix like-change bug
	// or see if SWR invalidation works

	console.log(sortParam, 'SORTPARAM')

	return (
		<div className='w-full'>
			<table className='w-full'>
				<thead>
					<tr className='border-gray-200 border-b'>
						<th className='py-2'></th>
						<th className='text-left py-4'>#</th>
						<th className='text-left'>Name</th>
						<th className='text-right'>Price</th>
						<th
							className={`text-right cursor-pointer hover:text-green-500 ${
								sortParam.type === '1hr' &&
								sortParam.direction === 'asc' &&
								'text-red-500'
							} ${
								sortParam.type === '1hr' &&
								sortParam.direction === 'desc' &&
								'text-green-500 hover:!text-red-500'
							}
							`}
							onClick={() => handleSort('1hr', sortParam, setSortParam)}
						>
							1h%
						</th>
						<th
							className={`text-right cursor-pointer hover:text-green-500 ${
								sortParam.type === '24hr' &&
								sortParam.direction === 'asc' &&
								'text-red-500'
							} ${
								sortParam.type === '24hr' &&
								sortParam.direction === 'desc' &&
								'text-green-500 hover:!text-red-500'
							}
							`}
							onClick={() => handleSort('24hr', sortParam, setSortParam)}
						>
							24h%
						</th>
						<th
							className={`text-right cursor-pointer hover:text-green-500 ${
								sortParam.type === '7d' &&
								sortParam.direction === 'asc' &&
								'text-red-500'
							} ${
								sortParam.type === '7d' &&
								sortParam.direction === 'desc' &&
								'text-green-500 hover:!text-red-500'
							}
							`}
							onClick={() => handleSort('7d', sortParam, setSortParam)}
						>
							7d%
						</th>
						<th
							className={`text-right cursor-pointer hover:text-green-500 ${
								sortParam.type === 'mcap' &&
								sortParam.direction === 'asc' &&
								'text-red-500'
							} ${
								sortParam.type === 'mcap' &&
								sortParam.direction === 'desc' &&
								'text-green-500 hover:!text-red-500'
							}
							`}
							onClick={() => handleSort('mcap', sortParam, setSortParam)}
						>
							Market Cap
						</th>
						<th
							className={`text-right cursor-pointer hover:text-green-500 ${
								sortParam.type === 'volume' &&
								sortParam.direction === 'asc' &&
								'text-red-500'
							} ${
								sortParam.type === 'volume' &&
								sortParam.direction === 'desc' &&
								'text-green-500 hover:!text-red-500'
							}
							`}
							onClick={() => handleSort('volume', sortParam, setSortParam)}
						>
							Volume(24h)
						</th>
					</tr>
				</thead>
				<tbody>
					{displayCoins
						.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
						.map((coin) => {
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
											className='font-medium flex items-center gap-2'
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
											coin.price_change_percentage_7d_in_currency > 0
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
			<Pagination
				rowsPerPage={rowsPerPage}
				setRowsPerPage={updateRowsPerPage}
				rowsPerPageOptions={rowsPerPageOptions}
				totalCount={displayCoins.length}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				nextPage={nextPage}
				prevPage={prevPage}
			/>
		</div>
	)
}

export default CoinTable
