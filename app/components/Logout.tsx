'use client'

import { signOut } from 'next-auth/react'

export default function Logout() {
	return (
		<button
			className='font-medium text-blue-500 border-2 border-blue-500 rounded-md px-3 py-1'
			onClick={() => signOut()}
		>
			Sign Out
		</button>
	)
}
