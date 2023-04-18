import { useState } from 'react'
import { coinType } from '@/app/utils/types'
import CoinForm from './CoinForm'

const PurchaseForm = ({
	coins,
	modalActive,
	setModalActive,
}: {
	coins: coinType[]
	modalActive: boolean
	setModalActive: (value: boolean) => void
}) => {
	const [actionType, setActionType] = useState<'Buy' | 'Sell'>('Buy')
	const [formData, setFormData] = useState<{
		coinId: string
		coin: string
		amount: number
	}>({
		coinId: 'bitcoin',
		coin: 'Bitcoin',
		amount: 0,
	})

	return (
		<div className='hidden md:flex gap-6 flex-col basis-2/6 bg-white shadow-sm border border-gray-200 rounded-md relative'>
			{modalActive && (
				<CoinForm
					coins={coins}
					setModalActive={setModalActive}
					setFormData={setFormData}
					formData={formData}
				/>
				// <div className='bg-white p-4 z-[101] absolute top-[10%] left-[10%] h-4/5 w-4/5 rounded-md'>
				// 	<input type='text' onChange={(e) => setCoinSearch(e.target.value)} />
				// 	{coinSearch}
				// </div>
			)}
			<div className='flex'>
				<div
					className={`basis-full text-center px-4 py-4 border-b border-r font-semibold text-base cursor-pointer rounded-t-md ${
						actionType === 'Buy'
							? 'border-b-white border-t-2 border-t-blue-500 text-blue-500'
							: 'border-b-gray-200 border-t-2 border-t-white'
					}`}
					onClick={() => setActionType('Buy')}
				>
					Buy
				</div>
				<div
					className={`basis-full text-center px-4 py-4 border-b font-semibold text-base cursor-pointer rounded-t-md ${
						actionType === 'Sell'
							? 'border-b-white border-t-2 border-t-blue-500 text-blue-500'
							: 'border-b-gray-200 border-t-2 border-t-white'
					}`}
					onClick={() => setActionType('Sell')}
				>
					Sell
				</div>
			</div>
			<form action='' className='flex flex-col gap-4 px-6'>
				<div className='flex gap-2 text-base font-semibold'>
					$
					<input
						className='outline-none text-4xl font-semibold appearance-none inline-block w-auto'
						type='number'
						placeholder='0'
					/>
				</div>
				<input type='number' placeholder='price' />
				<div onClick={() => setModalActive(true)}>{formData.coin}</div>
				<div className='flex gap-6'>
					<button className='text-base font-semibold bg-gray-200 p-4 rounded-full basis-full'>
						$100
					</button>
					<button className='text-base font-semibold bg-gray-200 p-4 rounded-full basis-full'>
						$500
					</button>
					<button className='text-base font-semibold bg-gray-200 p-4 rounded-full basis-full'>
						$1,000
					</button>
				</div>
				<button
					type='submit'
					className='text-base font-semibold bg-blue-500 p-4 rounded-full text-white'
				>
					{actionType}
				</button>
			</form>

			<div className='flex justify-between px-6 pb-6'>
				<div className='text-slate-500'>USD Balance</div>
				<div>$1,230,2497</div>
			</div>
		</div>
	)
}

export default PurchaseForm
