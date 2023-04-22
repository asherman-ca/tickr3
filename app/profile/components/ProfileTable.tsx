'use client'
import { useState, useMemo } from 'react'
import { ChartPieIcon, StarIcon } from '@heroicons/react/24/solid'
import WatchListTable from './WatchListTable'
import PortfolioTable from './PortfolioTable'
import { calcPNL } from '@/app/utils/account'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/app/utils/fetchers'

const ProfileTable = ({ user, coins, session }: any) => {
	const {
		data: clientUser,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryFn: () => getUserProfile(session.user.id),
		queryKey: [`user`],
	})
	const [showWatchlist, setShowWatchlist] = useState(true)
	const pnl = useMemo(
		() => calcPNL(clientUser?.orders || user.orders, coins),
		[clientUser, user.orders, coins]
	)

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
				<PortfolioTable accounts={pnl} />
			)}
		</div>
	)
}

export default ProfileTable
