import ExchangesTable from './components/ExchangesTable'
import { getStaticExchanges } from '../utils/fetchers'

export const revalidate = 86400

const page = async () => {
	const exchanges = await getStaticExchanges()

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
