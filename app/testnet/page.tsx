import { getStaticCoins } from '../utils/fetchers'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Testnet from './components/Testnet'
import Login from '../components/Login'
import { redirect } from 'next/navigation'

async function page() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/')
	}

	const coins = await getStaticCoins()
	coins.sort((a, b) => a.market_cap_rank - b.market_cap_rank)

	if (!session) {
		return (
			<div className='flex flex-col justify-center items-center flex-1 gap-4'>
				<div className='text-2xl font-bold'>Login Required</div>
				<Login />
			</div>
		)
	}

	return <Testnet coins={coins} session={session} />
}

export default page
