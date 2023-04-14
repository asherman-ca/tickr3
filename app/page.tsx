import { getStaticGlobal, getStaticCoins, getUserLikes } from './utils/fetchers'
import CoinTable from './components/CoinTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export default async function Home() {
	const globals = await getStaticGlobal()
	const coins = await getStaticCoins()
	const session = await getServerSession(authOptions)
	const initialLikes = session ? await getUserLikes(session.user.id) : []

	console.log(session)

	return (
		<main className='flex flex-col py-8'>
			<div className='px-12'>Title</div>
			<div>Trending Carousel</div>
			<CoinTable coins={coins} initialLikes={initialLikes} />
		</main>
	)
}
