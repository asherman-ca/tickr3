import './globals.css'
import 'sanitize.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import { Providers as SessionProvider } from './components/Providers'
import { getServerSession } from 'next-auth'

import { CoinContextProvider } from './context/coinContext'
import Nav from './components/Nav'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

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
			<body className={inter.className}>
				<CoinContextProvider>
					<SessionProvider session={session}>
						<Nav />
						{children}
					</SessionProvider>
				</CoinContextProvider>
			</body>
		</html>
	)
}
