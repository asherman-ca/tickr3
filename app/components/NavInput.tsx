'use client'
import { coin } from '../utils/types'
import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'

function NavInput({ coins }: { coins: coin[] }) {
	const [search, setSearch] = useState('')
	const [focusIn, setFocusIn] = useState(false)
	const [focusComplete, setFocusComplete] = useState(false)
	const router = useRouter()

	useEffect(() => {
		if (focusIn) {
			setTimeout(() => {
				setFocusComplete(true)
			}, 350)
		}
	}, [focusIn])

	const displayCoins = useMemo(() => {
		if (search === '') return []
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
				className={`h-full outline-none border-2 border-gray-200 p-2 w-full rounded-md ${
					focusIn && 'border-b-0 rounded-b-none'
				}`}
				placeholder={`${focusComplete ? 'Search coin or exchange' : 'Search'}`}
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
					setFocusComplete(false)
					setSearch('')
				}}
			/>
			{focusIn && (
				<div
					className={`absolute border-2 border-gray-200 w-100% p-2 w-full transition-all ease-in-out duration-500 border-t-0 bg-white rounded-b-md`}
				>
					{displayCoins.length === 0 && <div>Trending</div>}
					{displayCoins.map((coin) => {
						return <div>{coin.name}</div>
					})}
				</div>
			)}
		</div>
	)
}

export default NavInput
