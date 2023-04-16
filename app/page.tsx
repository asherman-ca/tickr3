import { getStaticGlobal, getStaticCoins } from './utils/fetchers'
import { numParseTwoDecimal, moneyParse } from './utils/parsers'
import CoinTableContainer from './components/CoinTableContainer'
import Highlights from './components/Highlights'

export default async function Home() {
	const globals = await getStaticGlobal()
	const coins = await getStaticCoins()

	return (
		<main className='flex flex-col py-8 gap-6 flex-1'>
			<Highlights coins={coins} globals={globals} />
			<div className='px-12 flex flex-1'>
				{/* @ts-ignore */}
				<CoinTableContainer coins={coins} />
			</div>
		</main>
	)
}
