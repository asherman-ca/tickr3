// import { CoinsData } from '../context/coinContext'
// import { useSession } from 'next-auth/react'
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
	// const { coins, loading } = CoinsData()
	// const { data: session, status } = useSession()
	// const data = await getCoins()
	// const session = await getServerSession(authOptions)
	const [data, session] = await Promise.all([
		getCoins(),
		getServerSession(authOptions),
	])
	console.log('sesh', session)
	return (
		<div>
			<NavInput coins={data} />
			{!session && <Login />}
			{session && <Logout />}
			{data[0].name}
		</div>
	)
}

export default Nav
