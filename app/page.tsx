import { getStaticGlobal, getStaticCoins } from './utils/fetchers'
import CoinTableContainer from './components/CoinTableContainer'

export default async function Home() {
	const globals = await getStaticGlobal()
	const coins = await getStaticCoins()

	return (
		<main className='flex flex-col py-8 gap-4 flex-1'>
			<div className='px-12'>Title</div>
			<div className='px-12'>Trending</div>
			<div className='px-12 flex flex-1'>
				{/* @ts-ignore */}
				<CoinTableContainer coins={coins} />
			</div>
		</main>
	)
}
