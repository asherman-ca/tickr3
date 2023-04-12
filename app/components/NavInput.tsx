'use client'
import { coinType } from '../utils/types'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

function NavInput({ coins }: { coins: coinType[] }) {
	const [search, setSearch] = useState('')
	const [focusIn, setFocusIn] = useState(false)
	const [focusComplete, setFocusComplete] = useState(false)
	const router = useRouter()
	// const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		if (focusIn) {
			setTimeout(() => {
				setFocusComplete(true)
			}, 400)
		}
	}, [focusIn])

	const trendingCoins = useMemo(() => {
		const coinCopy = [...coins]
		return coinCopy
			.sort((a, b) => {
				return (
					Math.abs(b.price_change_percentage_1h_in_currency) -
					Math.abs(a.price_change_percentage_1h_in_currency)
				)
			})
			.slice(0, 5)
	}, [coins])

	const displayCoins = useMemo(() => {
		if (search === '') return []
		return coins.filter((coin) => {
			return coin.name.toLowerCase().includes(search.toLowerCase())
		})
	}, [search])

	const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		if (
			event.relatedTarget instanceof HTMLElement &&
			event.relatedTarget.parentElement?.id === 'search-results' && // Check if mouse is over search results
			(event.relatedTarget as HTMLAnchorElement).href // Check if mouse is over a link
		) {
			router.push(`${(event.relatedTarget as HTMLAnchorElement).href}`)
		}
		setFocusIn(false)
		setFocusComplete(false)
		setSearch('')
	}

	// console.log('tcoins', trendingCoins)

	return (
		<div
			className={`relative ${!focusIn && 'min-w-0'} ${
				focusIn && 'min-w-full'
			} transition-all ease-in-out duration-500`}
		>
			<div
				className={`flex border-2 border-gray-200 rounded-md items-center px-2 py-1 ${
					focusComplete && 'rounded-b-none'
				}`}
			>
				<MagnifyingGlassIcon height={24} width={24} />
				<input
					className={`h-full outline-none  p-2 w-full `}
					placeholder={`${
						focusComplete ? 'Search coin or exchange' : 'Search'
					}`}
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => {
						if (e.code === 'Enter') {
							router.push(`/coin/${search}`)
						}
					}}
					onFocus={() => setFocusIn(true)}
					onBlur={handleInputBlur}
					// ref={inputRef}
				/>
			</div>
			{focusComplete && (
				<div
					id='search-results'
					className={`-mt-[2px] absolute flex flex-col justify-start border-2 border-gray-200 w-100% w-full transition-all ease-in-out duration-500 border-t-0 bg-white rounded-b-md max-h-80 overflow-auto scrollable`}
				>
					{displayCoins.length === 0 && (
						<>
							<div className='text-left py-1 px-2'>Trending</div>
							{trendingCoins.map((coin) => {
								return (
									<Link
										key={coin.id}
										href={`/coin/${coin.id}`}
										className='text-left hover:bg-blue-100 py-1 px-2'
									>
										{coin.name}
									</Link>
								)
							})}
						</>
					)}
					{displayCoins.map((coin) => {
						return (
							<Link
								key={coin.id}
								href={`/coin/${coin.id}`}
								className='text-left hover:bg-blue-100 py-1 px-2'
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
