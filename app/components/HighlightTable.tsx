import Image from 'next/image'
import { useEffect, useState } from 'react'
import { coinType } from '../utils/types'
import { ClockIcon } from '@heroicons/react/24/outline'
import { FireIcon } from '@heroicons/react/24/solid'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

import { numParseTwoDecimal } from '../utils/parsers'

type durationType =
	| 'price_change_percentage_1h_in_currency'
	| 'price_change_percentage_24h_in_currency'
	| 'price_change_percentage_7d_in_currency'

type Props = {
	coins: coinType[]
	duration: durationType
	title: string
}

const HighlightTable = ({ coins, duration, title }: Props) => {
	const [page, setPage] = useState(1)
	useEffect(() => {
		const interval = setInterval(() => {
			setPage((prev) => (prev === 3 ? 1 : prev + 1))
		}, 10000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className='basis-full flex flex-col gap-4 bg-white shadow-sm rounded-md p-4 overflow-hidden'>
			<div className='flex gap-2 items-center'>
				{duration === 'price_change_percentage_1h_in_currency' && (
					<FireIcon height={24} width={24} color={'red'} />
				)}
				{duration === 'price_change_percentage_24h_in_currency' && (
					<ClockIcon height={24} width={24} />
				)}
				{duration === 'price_change_percentage_7d_in_currency' && (
					<CalendarDaysIcon height={24} width={24} />
				)}
				<span className='font-semibold text-base'>{title}</span>
			</div>
			{coins.slice((page - 1) * 3, page * 3).map((coin, index) => (
				<div
					key={`${duration} ${coin.id}`}
					className='flex justify-between fly-in'
				>
					<div className='flex gap-3 items-center'>
						<span className='text-slate-500'>{index + (page - 1) * 3 + 1}</span>
						<Image height={24} width={24} src={coin.image} alt={coin.name} />
						{coin.name}{' '}
						<span className='text-slate-500'>{coin.symbol.toUpperCase()}</span>
					</div>
					<div
						className={`${
							coin[duration] > 0 ? 'text-green-500' : 'text-red-500'
						}`}
					>
						{numParseTwoDecimal(coin[duration])}%
					</div>
				</div>
			))}
		</div>
	)
}

export default HighlightTable
