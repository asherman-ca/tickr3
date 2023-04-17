'use client'

import { useState } from 'react'
import { coinType, globalType } from '../utils/types'
import { moneyParse, numParseTwoDecimal } from '../utils/parsers'
import HighlightTable from './HighlightTable'

type Props = {
	hourTrends: coinType[]
	dayTrends: coinType[]
	weekTrends: coinType[]
	globals: globalType
}

const Highlights = ({ hourTrends, dayTrends, weekTrends, globals }: Props) => {
	const [showHighlights, setShowHighlights] = useState(true)

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between px-12'>
				<div className='flex flex-col gap-1'>
					<div className='text-2xl font-bold'>
						Today's Cryptocurrency Prices by Market Cap
					</div>
					<div className='text-base text-slate-500'>
						The global crypto market cap is{' '}
						{moneyParse(globals.data.total_market_cap.usd)}, a
						<span
							className={`${
								globals.data.market_cap_change_percentage_24h_usd > 0
									? 'text-green-500'
									: 'text-red-500'
							}`}
						>
							{' '}
							{numParseTwoDecimal(
								globals.data.market_cap_change_percentage_24h_usd
							)}
							%
						</span>{' '}
						change over 24 hours.
					</div>
				</div>
				<div>
					Highlights
					<button
						className='relative'
						onClick={() => setShowHighlights((prev) => (prev ? false : true))}
					>
						Button
					</button>
				</div>
			</div>

			{showHighlights && (
				<div className='px-12 flex gap-4 slide-in'>
					<HighlightTable
						coins={hourTrends}
						title={'Hourly Trends'}
						duration={'price_change_percentage_1h_in_currency'}
					/>
					<HighlightTable
						coins={dayTrends}
						title={'Daily Trends'}
						duration={'price_change_percentage_24h_in_currency'}
					/>
					<HighlightTable
						coins={weekTrends}
						title={'Weekly Trends'}
						duration={'price_change_percentage_7d_in_currency'}
					/>
				</div>
			)}
		</div>
	)
}

export default Highlights