'use client'
import { coinType } from '@/app/utils/types'
import PurchaseForm from './PurchaseForm'
import { useState } from 'react'

type Props = {
	coins: coinType[]
	session: any
}

const Testnet = ({ coins, session }: Props) => {
	const [modalActive, setModalActive] = useState(false)

	return (
		<div className='py-8 flex flex-col md:flex-row px-12 gap-4'>
			{modalActive && (
				<div
					className='absolute top-0 left-0 w-screen h-screen z-[75] bg-black opacity-50'
					onClick={() => setModalActive(false)}
				></div>
			)}
			<div className='basis-4/6 bg-white shadow-sm border border-gray-200 rounded-md p-4'>
				List
			</div>
			<PurchaseForm
				coins={coins}
				modalActive={modalActive}
				setModalActive={setModalActive}
			/>
		</div>
	)
}

export default Testnet
