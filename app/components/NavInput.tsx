'use client'
import { coin } from '../utils/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function NavInput({ coins }: { coins: coin[] }) {
	const [search, setSearch] = useState('')
	const router = useRouter()

	return (
		<div>
			<input
				type='text'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={(e) => {
					if (e.code === 'Enter') {
						router.push(`/coin/${search}`)
					}
				}}
			/>
		</div>
	)
}

export default NavInput
