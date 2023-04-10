'use client'
import { SessionProvider } from 'next-auth/react'
import { sessionType } from '../utils/types'

export function Providers({
	children,
	session,
}: {
	children: React.ReactNode
	session: sessionType
}) {
	return <SessionProvider session={session}>{children}</SessionProvider>
}
