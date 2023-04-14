import { getStaticGlobal, getStaticCoins } from './utils/fetchers'
import CoinTable from './components/CoinTable'

export default async function Home() {
	const globals = await getStaticGlobal()
	const coins = await getStaticCoins()

	return (
		<main className='flex flex-col py-8'>
			<div className='px-12'>Title</div>
			<div>Trending Carousel</div>
			<CoinTable coins={coins} />
		</main>
	)
}
