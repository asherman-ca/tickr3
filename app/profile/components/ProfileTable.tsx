'use client'
import { useState } from 'react'
import { ChartPieIcon, StarIcon } from '@heroicons/react/24/solid'
import WatchListTable from './WatchListTable'
import PortfolioTable from './PortfolioTable'
import { calcPNL } from '@/app/utils/account'

const ProfileTable = ({ user, coins, session }: any) => {
	const [showWatchlist, setShowWatchlist] = useState(true)
	const pnl = calcPNL(user.orders, coins)
	console.log('PNL', pnl)
	// console.log('orders', user.orders)

	return (
		<div className='flex flex-col gap-4 px-12'>
			<div className='flex gap-4'>
				<button
					className='p-2 bg-gray-100 rounded-md flex items-cente gap-2 profile-button'
					onClick={() => setShowWatchlist(true)}
				>
					<StarIcon height={18} width={18} color={'gray'} />
					Watchlist
				</button>
				<button
					className='p-2 bg-gray-100 rounded-md flex items-center gap-2 profile-button'
					onClick={() => setShowWatchlist(false)}
				>
					<ChartPieIcon height={18} width={18} color={'gray'} />
					Portfolio
				</button>
			</div>
			{showWatchlist ? (
				<WatchListTable coins={coins} session={session} />
			) : (
				<PortfolioTable orders={user.orders} />
			)}
		</div>
	)
}

export default ProfileTable
