import './globals.css'
import 'sanitize.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { Providers as SessionProvider } from './components/Providers'
import QueryWrapper from './components/Wrappers'
import { getServerSession } from 'next-auth'

import Nav from './components/Nav'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { Suspense } from 'react'
import Loading from './loading'

export const metadata = {
	title: 'Tickr',
	description: 'Next 13 Crypto Deets',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)

	return (
		<html lang='en'>
			<body className={`${inter.className} min-h-screen color-bg text-sm`}>
				{/* <CoinContextProvider> */}
				<SessionProvider session={session}>
					<QueryWrapper>
						<Suspense fallback={<Loading />}>
							{/* @ts-expect-error Server Component */}
							<Nav />
							{children}
						</Suspense>
					</QueryWrapper>
				</SessionProvider>
				{/* </CoinContextProvider> */}
			</body>
		</html>
	)
}
