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
		<nav className='flex bg-white py-2 px-4'>
			<div className='basis-full'>Tickr</div>
			<div className='hidden sm:flex basis-full'>
				{!session ? <Login /> : <Logout />}
			</div>
			<div className='hidden sm:flex basis-full justify-end'>
				<NavInput coins={data} />
			</div>
			<div className='sm:hidden flex basis:full justify-end'>Dropdown</div>
		</nav>
	)
}

export default Nav
