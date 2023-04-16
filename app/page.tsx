import { getStaticGlobal, getStaticCoins } from './utils/fetchers'
import { numParseTwoDecimal, moneyParse } from './utils/parsers'
import CoinTableContainer from './components/CoinTableContainer'

export default async function Home() {
	const globals = await getStaticGlobal()
	const coins = await getStaticCoins()

	return (
		<main className='flex flex-col py-8 gap-6 flex-1'>
			<div className='px-12 flex flex-col gap-1'>
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
			<div className='px-12'>Trending</div>
			<div className='px-12 flex flex-1'>
				{/* @ts-ignore */}
				<CoinTableContainer coins={coins} />
			</div>
		</main>
	)
}
