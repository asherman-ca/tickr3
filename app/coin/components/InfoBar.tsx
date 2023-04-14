'use client'
import { coinView, likeType } from '@/app/utils/types'
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
	return (
		<div className='flex flex-col gap-2 border-b-2 border-slate-200 pb-4 px-12 pt-8'>
			<div className='flex flex-col gap-2'>
				<div className='flex gap-8'>
					<div className='flex gap-2'>
						<Image
							height={48}
							width={48}
							src={coin.image.small}
							alt='coin image'
							className='rounded-full'
						/>
						<div className='flex flex-col justify-center items-start'>
							<div className='text-2xl font-medium'>{coin.name}</div>
							<div className='text-slate-500'>
								({coin.symbol.toUpperCase()})
							</div>
						</div>
					</div>
					<div className='flex flex-col justify-center items-start'>
						<span className='text-2xl font-medium'>
							${coin.market_data.current_price.usd}
						</span>
						<div className='text-slate-500'>
							1.000 {coin.symbol.toUpperCase()}
						</div>
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
												key={site}
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
