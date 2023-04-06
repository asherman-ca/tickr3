// import { CoinsData } from '../context/coinContext'
// import { useSession } from 'next-auth/react'
import Login from './Login'
import Logout from './Logout'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'

const getCoins = async () => {
	const res = await fetch(
		`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&price_change_percentage=1h,24h,7d,30d`,
		{
			next: { revalidate: 120 },
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
	console.log('data', data)
	return (
		<div>
			{!session && <Login />}
			{session && <Logout />}
			{data[0].name}
		</div>
	)
}

export default Nav
