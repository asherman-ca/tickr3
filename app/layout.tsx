import './globals.css'
import 'sanitize.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

import { CoinContextProvider } from './context/coinContext'
import Nav from './components/Nav'

export const metadata = {
	title: 'Tickr',
	description: 'Next 13 Crypto Deets',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<CoinContextProvider>
					<Nav />
					{children}
				</CoinContextProvider>
			</body>
		</html>
	)
}
