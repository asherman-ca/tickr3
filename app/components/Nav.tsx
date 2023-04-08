import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

import { coin } from '../utils/types'
import NavInput from './NavInput'
import Login from './Login'
import Logout from './Logout'

const getCoins = async (): Promise<coin[]> => {
	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d`,
		{
			next: { revalidate: 300 },
			// cache: 'no-store',
		}
	)
	return await res.json()
}

async function Nav() {
	const [data, session] = await Promise.all([
		getCoins(),
		getServerSession(authOptions),
	])
	return (
		<nav className='flex bg-white pt-2 pb-4 box-shadow-grey flex-col'>
			<div className='flex justify-between pb-2 border-b-2 border-gray-100 px-8'>
				<div className='flex gap-4'>
					<span>Cryptos: 23,253</span>
					<span>Exchange: 603</span>
				</div>
				<div>{!session ? <Login /> : <Logout />}</div>
			</div>
			<div className='flex pt-4 px-8'>
				<div className='basis-4/6 flex items-center justify-start gap-8'>
					<span className='text-2xl font-medium'>Tickr</span>
					<button className='font-medium'>Cyptocurrencies</button>
					<button className='font-medium'>Exchanges</button>
					<button className='font-medium'>Leaderboard</button>
				</div>
				<div className='hidden sm:flex basis-2/6 justify-end'>
					<NavInput coins={data} />
				</div>
				<div className='sm:hidden flex basis:full justify-end'>Dropdown</div>
			</div>
		</nav>
	)
}

export default Nav
