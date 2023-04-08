'use client'

import { signOut } from 'next-auth/react'

export default function Logout() {
	return (
		<button className='font-medium' onClick={() => signOut()}>
			Sign Out
		</button>
	)
}
