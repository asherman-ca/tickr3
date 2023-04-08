'use client'
import { coin } from '../utils/types'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function NavInput({ coins }: { coins: coin[] }) {
	const [search, setSearch] = useState('')
	const [focusIn, setFocusIn] = useState(false)
	const [focusComplete, setFocusComplete] = useState(false)
	const router = useRouter()
	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (focusIn) {
			setTimeout(() => {
				setFocusComplete(true)
			}, 400)
		}
	}, [focusIn])

	const displayCoins = useMemo(() => {
		if (search === '') return []
		return coins.filter((coin) => {
			return coin.name.toLowerCase().includes(search.toLowerCase())
		})
	}, [search])

	const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (
			event.relatedTarget instanceof HTMLElement &&
			event.relatedTarget.parentElement?.id === 'search-results' // Check if mouse is over sibling element
		) {
			router.push(`${event.relatedTarget.href}`)
		}
		setFocusIn(false)
		setFocusComplete(false)
		setSearch('')
	}

	return (
		<div
			className={`relative ${!focusIn && 'min-w-0'} ${
				focusIn && 'min-w-full'
			} transition-all ease-in-out duration-500`}
		>
			<input
				className={`h-full outline-none border-2 border-gray-200 p-2 w-full rounded-md ${
					focusComplete && 'border-b-0 rounded-b-none'
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
				// onBlur={() => {
				// 	setFocusIn(false)
				// 	setFocusComplete(false)
				// 	setSearch('')
				// }}
				onBlur={handleInputBlur}
				ref={inputRef}
			/>
			{focusComplete && (
				<div
					id='search-results'
					className={`absolute flex flex-col justify-start border-2 border-gray-200 w-100% p-2 w-full transition-all ease-in-out duration-500 border-t-0 bg-white rounded-b-md`}
				>
					{displayCoins.length === 0 && <div>Trending</div>}
					{displayCoins.map((coin) => {
						return (
							<Link
								key={coin.id}
								href={`/coin/${coin.name}`}
								className='text-left'
							>
								{coin.name}
							</Link>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default NavInput
