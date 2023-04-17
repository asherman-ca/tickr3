import { getStaticExchanges } from '../utils/fetchers'
import { exchangeType } from '../utils/types'
import ExchangesTable from './components/ExchangesTable'

const page = async () => {
	let exchanges: exchangeType[] = []
	try {
		exchanges = await getStaticExchanges()
	} catch (error) {
		console.log(error)
	}

	return (
		<div className='py-8 flex flex-col gap-8'>
			<div className='px-12 flex flex-col gap-2'>
				<div className='font-bold text-2xl'>
					Top Cryptocurrency Spot Exchanges
				</div>
				<div className='text-slate-500'>
					CoinMarketCap ranks and scores exchanges based on traffic, liquidity,
					trading volumes, and confidence in the legitimacy of trading volumes
					reported.
				</div>
			</div>
			<div className='px-12 flex flex-1'>
				<ExchangesTable exchanges={exchanges} />
			</div>
		</div>
	)
}

export default page
