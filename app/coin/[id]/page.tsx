import { getServerSession } from 'next-auth'
import { getStaticLikes, getStaticCoin } from '@/app/utils/fetchers'
import InfoBar from '../components/InfoBar'
import TickrBar from '../components/TickrBar'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

async function page({ params }: { params: { id: string } }) {
	const coin = await getStaticCoin(params.id)
	const likes = await getStaticLikes(params.id)
	const filteredMarkets = coin.tickers
		.filter((market: any) => market.base === coin.symbol.toUpperCase())
		.sort((a: any, b: any) => b.converted_volume.usd - a.converted_volume.usd)
		.slice(0, 5)
	const session = await getServerSession(authOptions)
	console.log('session', session)
	const initalUserLike = session
		? likes.filter((like) => like.userId === session.user.id)
		: []
	// TODO use getserversession here to find initial user like and drill down into client components

	console.log('initalUserLike', initalUserLike)

	return (
		<div className='srollable'>
			<InfoBar
				coin={coin}
				coinId={coin.id}
				staticLikes={likes}
				initialUserLike={initalUserLike}
			/>
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
