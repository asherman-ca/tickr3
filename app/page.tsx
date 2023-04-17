import { getStaticGlobal, getStaticCoins } from './utils/fetchers'
import CoinTableContainer from './components/CoinTableContainer'
import Highlights from './components/Highlights'

export default async function Home() {
	const globals = await getStaticGlobal()
	const coins = await getStaticCoins()
	const hourTrends = [...coins]
		.sort(
			(a, b) =>
				Math.abs(b.price_change_percentage_1h_in_currency) -
				Math.abs(a.price_change_percentage_1h_in_currency)
		)
		.slice(0, 9)
	const dayTrends = [...coins]
		.sort(
			(a, b) =>
				Math.abs(b.price_change_percentage_24h_in_currency) -
				Math.abs(a.price_change_percentage_24h_in_currency)
		)
		.slice(0, 9)
	const weekTrends = [...coins]
		.sort(
			(a, b) =>
				Math.abs(b.price_change_percentage_7d_in_currency) -
				Math.abs(a.price_change_percentage_7d_in_currency)
		)
		.slice(0, 9)

	return (
		<main className='flex flex-col py-8 gap-8 flex-1'>
			<Highlights
				hourTrends={hourTrends}
				dayTrends={dayTrends}
				weekTrends={weekTrends}
				globals={globals}
			/>
			<div className='px-12 flex flex-1'>
				{/* @ts-ignore */}
				<CoinTableContainer coins={coins} />
			</div>
		</main>
	)
}
