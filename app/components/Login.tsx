'use client'

import { signIn } from 'next-auth/react'

export default function Login() {
	return (
		<button
			className='font-medium border-2 border-blue-500 text-blue-500 rounded-md px-3 py-1'
			onClick={() => signIn('google')}
		>
			Sign In
		</button>
	)
}
