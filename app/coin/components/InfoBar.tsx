'use client'
import { useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { coinView, likeType } from '@/app/utils/types'
import { getCoinLikes, addLike, removeLike } from '@/app/utils/fetchers'
import { HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { moneyParse, numParse } from '@/app/utils/parsers'
import LikeButton from './LikeButton'
import Image from 'next/image'

function InfoBar({
	coinId,
	staticLikes,
	coin,
}: {
	coinId: string
	staticLikes: likeType[]
	coin: coinView
}) {
	const queryClient = useQueryClient()
	const { data: session, status: sessionStatus }: any = useSession()

	const {
		data: likes,
		error,
		isLoading,
	} = useQuery({
		queryFn: () => getCoinLikes(coinId),
		queryKey: ['coinLikes'],
	})

	const { mutate: handleAddLike } = useMutation(addLike, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['coinLikes'])
		},
		onError: (error) => {
			console.log('error', error)
		},
	})

	const { mutate: handleRemoveLike } = useMutation(removeLike, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['coinLikes'])
		},
		onError: (error) => {
			console.log('error', error)
		},
	})

	const userLike = useMemo(() => {
		if (likes && session) {
			return likes.filter((like) => {
				return like.userId === session.user.id
			})
		} else {
			return []
		}
	}, [likes, session])

	const handleLike = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!session) {
			return toast.error('must be logged in')
		}

		if (!userLike.length) {
			handleAddLike(coinId)
		} else {
			handleRemoveLike(coinId)
		}
	}

	// console.log('client session', sessionStatus)
	// console.log('userLike', userLike)
	// console.log('coin', coin)

	return (
		<div className='flex flex-col gap-2 border-b-2 border-slate-200 pb-4 px-12 pt-8'>
			<div className='flex flex-col gap-2'>
				<div className='flex gap-2'>
					<div className='flex gap-2'>
						<Image
							height={48}
							width={48}
							src={coin.image.small}
							alt='coin image'
							className='rounded-full'
						/>
						<div className='flex flex-col justify-center items-start'>
							<div className='text-lg'>{coin.name}</div>
							<div className='text-slate-500'>
								({coin.symbol.toUpperCase()})
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center items-start'>
						<div>{coin.market_data.current_price.usd}</div>
						<div className='text-slate-500'>1.0000</div>
					</div>
				</div>
				<div className='flex gap-2'>
					<div>
						{numParse(
							coin.market_data.price_change_percentage_1h_in_currency.usd
						)}
						%
					</div>
					<div>
						{numParse(
							coin.market_data.price_change_percentage_24h_in_currency.usd
						)}
						%
					</div>
					<div>
						{numParse(
							coin.market_data.price_change_percentage_7d_in_currency.usd
						)}
						%
					</div>
					<div>{moneyParse(coin.market_data.market_cap.usd)}</div>
					<div>{moneyParse(coin.market_data.total_volume.usd)}</div>
				</div>
			</div>

			<div className='flex justify-between'>
				<div className='flex items-center'>
					<LikeButton coinId={coinId} staticLikes={staticLikes} />
					<div className='ml-4 group relative'>
						<span className='cursor-pointer text-slate-500'>Explorers</span>
						<div className='absolute z-50 hidden group-hover:block min-w-full -translate-x-1/4'>
							<div className='flex flex-col mt-2 p-2 bg-white shadow-md rounded-md gap-1'>
								{!coin.links.blockchain_site && (
									<div className='p-1'>No Entries</div>
								)}
								{coin.links.blockchain_site
									?.filter((site) => site.length > 0)
									.map((site) => {
										return (
											<a
												target='_blank'
												rel='noopener noreferrer'
												href={site}
												className='p-1 rounded-md hover:bg-blue-100'
											>
												{site.split('//')[1]?.split('/')[0]}
											</a>
										)
									})}
							</div>
						</div>
					</div>
				</div>

				<div className='flex gap-2'>
					<div>link1</div>
					<div>link1</div>
					<div>link1</div>
					<div>link1</div>
				</div>
			</div>
		</div>
	)
}

export default InfoBar
