'use client'
import { CoinsData } from '../context/coinContext'
import { useSession } from 'next-auth/react'
import Login from './Login'
import Logout from './Logout'

function Nav() {
	const { coins, loading } = CoinsData()
	const { data: session, status } = useSession()

	console.log('sesh', session)

	return (
		<div>
			<Login />
			<Logout />
		</div>
	)
}

export default Nav
