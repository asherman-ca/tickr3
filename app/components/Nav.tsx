'use client'
import { CoinsData } from '../context/coinContext'
import Login from './Login'

function Nav() {
	const { coins, loading } = CoinsData()

	return (
		<div>
			<Login />
		</div>
	)
}

export default Nav
