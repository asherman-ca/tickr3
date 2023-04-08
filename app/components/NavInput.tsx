'use client'
import { coin } from '../utils/types'
import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'

function NavInput({ coins }: { coins: coin[] }) {
	const [search, setSearch] = useState('')
	const [focusIn, setFocusIn] = useState(false)
	const router = useRouter()

	const displayCoins = useMemo(() => {
		return coins.filter((coin) => {
			return coin.name.toLowerCase().includes(search.toLowerCase())
		})
	}, [search])

	return (
		<div
			className={`relative ${!focusIn && 'min-w-0'} ${
				focusIn && 'min-w-full'
			} transition-all ease-in-out duration-500`}
		>
			<input
				className={`h-full outline-none bg-gray-100 rounded-t-sm p-2 w-full`}
				placeholder='search'
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						router.push(`/coin/${search}`)
					}
				}}
				onFocus={() => setFocusIn(true)}
				onBlur={() => {
					setFocusIn(false)
					setSearch('')
				}}
			/>
			{search && (
				<div className='absolute bg-gray-100 w-100% px-2 w-full'>
					{displayCoins.map((coin) => {
						return <div>{coin.name}</div>
					})}
				</div>
			)}
		</div>
	)
}

export default NavInput
