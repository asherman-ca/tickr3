'use client'
import { coinView, likeType } from '@/app/utils/types'
import { moneyParse, numParseTwoDecimal } from '@/app/utils/parsers'
import LikeButton from './LikeButton'
import Image from 'next/image'
import {
	CircleStackIcon,
	LinkIcon,
	CodeBracketSquareIcon,
} from '@heroicons/react/24/outline'

function InfoBar({
	coinId,
	staticLikes,
	coin,
	initialUserLike,
}: {
	coinId: string
	staticLikes: likeType[]
	coin: coinView
	initialUserLike: likeType[]
}) {
	return (
		<div className='flex flex-col gap-4 border-b-2 border-slate-200 pb-4 pt-8'>
			<div className='flex flex-col gap-4 px-12'>
				<div className='flex gap-4'>
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
							{moneyParse(coin.market_data.current_price.usd)}
						</span>
						<div className='text-slate-500'>
							1.00000 {coin.symbol.toUpperCase()}
						</div>
					</div>
				</div>
				<div className='flex gap-8 text-base'>
					<div>
						<div className='text-slate-500'>1h %</div>
						<div
							className={`${
								coin.market_data.price_change_percentage_1h_in_currency.usd < 0
									? 'text-red-500'
									: 'text-green-500'
							} font-medium`}
						>
							{numParseTwoDecimal(
								coin.market_data.price_change_percentage_1h_in_currency.usd
							)}
							%
						</div>
					</div>
					<div>
						<div className='text-slate-500'>24hrs %</div>
						<div
							className={`${
								coin.market_data.price_change_percentage_24h_in_currency.usd < 0
									? 'text-red-500'
									: 'text-green-500'
							} font-medium`}
						>
							{numParseTwoDecimal(
								coin.market_data.price_change_percentage_24h_in_currency.usd
							)}
							%
						</div>
					</div>
					<div>
						<div className='text-slate-500'>7d %</div>
						<div
							className={`${
								coin.market_data.price_change_percentage_7d_in_currency.usd < 0
									? 'text-red-500'
									: 'text-green-500'
							} font-medium`}
						>
							{numParseTwoDecimal(
								coin.market_data.price_change_percentage_7d_in_currency.usd
							)}
							%
						</div>
					</div>
					<div>
						<div className='text-slate-500'>Market Cap</div>
						<div className='font-medium'>
							{moneyParse(coin.market_data.market_cap.usd)}
						</div>
					</div>
					<div>
						<div className='text-slate-500'>Volume (24h)</div>
						<div className='font-medium'>
							{moneyParse(coin.market_data.total_volume.usd)}
						</div>
					</div>
				</div>
			</div>

			<div className='flex justify-between border-t-2 border-slate-200 pt-4 px-12'>
				<div className='flex items-center'>
					<LikeButton
						coinId={coinId}
						coin={coin.name}
						image={coin.image.small}
						staticLikes={staticLikes}
						initialUserLike={initialUserLike}
					/>
					<div className='ml-4 group relative'>
						<span className='cursor-pointer text-slate-500'>Explorers</span>
						<div className='absolute z-50 hidden group-hover:block min-w-full -translate-x-1/4'>
							<div className='flex flex-col mt-2 p-3 bg-white shadow-md rounded-md gap-1'>
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
												className='px-2 py-1 rounded-md hover:bg-blue-100 font-medium'
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

				<div className='flex gap-4 items-center'>
					<div>
						<a
							href={coin.links.homepage[0]}
							target='_blank'
							rel='noopener noreferrer'
						>
							<Image
								src={coin.image.small}
								height={24}
								width={24}
								alt='coin homepage'
							/>
						</a>
					</div>
					<div>
						<a
							href={coin.links.blockchain_site[0]}
							target='_blank'
							rel='noopener noreferrer'
						>
							<CircleStackIcon height={24} width={24} color={'blue'} />
						</a>
					</div>
					<div>
						<a
							href={coin.links.subreddit_url}
							target='_blank'
							rel='noopener noreferrer'
						>
							<LinkIcon height={24} width={24} color={'red'} />
						</a>
					</div>
					<div>
						<a
							href={coin.links.repos_url.github[0]}
							target='_blank'
							rel='noopener noreferrer'
						>
							<CodeBracketSquareIcon height={24} width={24} />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default InfoBar
