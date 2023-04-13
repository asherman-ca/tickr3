import { getServerSession } from 'next-auth'
import { getStaticLikes, getStaticCoin } from '@/app/utils/fetchers'
import InfoBar from '../components/InfoBar'
import TickrBar from '../components/TickrBar'

async function page({ params }: { params: { id: string } }) {
	const coin = await getStaticCoin(params.id)
	const likes = await getStaticLikes(params.id)
	const filteredMarkets = coin.tickers
		.filter((market: any) => market.base === coin.symbol.toUpperCase())
		.sort((a: any, b: any) => b.converted_volume.usd - a.converted_volume.usd)
		.slice(0, 5)

	return (
		<div className='srollable'>
			<InfoBar coin={coin} coinId={coin.id} staticLikes={likes} />
			<TickrBar title={coin.name} markets={filteredMarkets} />
			<div className='flex flex-col gap-2 text-base px-12 pt-4 pb-8'>
				<div className='text-xl font-medium'>
					What is {coin.name} ({coin.symbol.toUpperCase()})
				</div>
				{coin.description.en.replace(/<\/?a[^>]*>/g, '')}
			</div>
		</div>
	)
}

export default page
