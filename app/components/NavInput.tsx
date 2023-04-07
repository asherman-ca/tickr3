'use client'
import { coin } from '../utils/types'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

function NavInput({ coins }: { coins: coin[] }) {
	const [search, setSearch] = useState('')
	const router = useRouter()

	const displayCoins = useMemo(() => {
		return coins.filter((coin) => {
			return coin.name.toLowerCase().includes(search.toLowerCase())
		})
	}, [search])

	return (
		<div className='relative mx-auto'>
			<input
				className='h-full p-2'
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						router.push(`/coin/${search}`)
					}
				}}
			/>
			{search && (
				<div className='absolute top-100% mt-8'>
					{displayCoins.map((coin) => {
						return <div>{coin.name}</div>
					})}
				</div>
			)}
		</div>
	)
}

export default NavInput
