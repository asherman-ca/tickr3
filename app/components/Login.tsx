'use client'

import { signIn } from 'next-auth/react'

export default function Login() {
	return (
		<button className='' onClick={() => signIn('google')}>
			Sign In
		</button>
	)
}
