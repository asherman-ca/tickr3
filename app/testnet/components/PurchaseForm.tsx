import { useState } from 'react'
import Image from 'next/image'
import { ChevronRightIcon, BanknotesIcon } from '@heroicons/react/24/solid'

import { moneyParse } from '@/app/utils/parsers'
import CoinForm from './CoinForm'
import { coinType } from '@/app/utils/types'

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
		image: string
		amount: number
		price: number
		symbol: string
	}>({
		coinId: coins[0].id,
		coin: coins[0].name,
		image: coins[0].image,
		amount: 0,
		price: coins[0].current_price,
		symbol: coins[0].symbol,
	})

	console.log(formData, 'formData')

	return (
		<div className='hidden md:flex gap-6 flex-col basis-2/6 bg-white shadow-sm border border-gray-200 rounded-md relative text-base'>
			{modalActive && (
				<CoinForm
					coins={coins}
					setModalActive={setModalActive}
					setFormData={setFormData}
					formData={formData}
				/>
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
						placeholder='0.00'
						className='outline-none text-4xl font-semibold appearance-none inline-block w-auto'
						type='number'
						// value={formData.amount}
						onChange={(e) =>
							setFormData({ ...formData, amount: +e.target.value })
						}
					/>
				</div>
				<div className='flex py-2 px-4 gap-2'>
					<span className='text-slate-500'>
						{formData.symbol.toUpperCase()}/USD:
					</span>
					{moneyParse(formData.price)}
				</div>
				<div className='border border-slate-200 rounded-md'>
					<div
						onClick={() => setModalActive(true)}
						className='flex items-center justify-between border-b border-slate-200 p-4 hover:bg-gray-100 cursor-pointer'
					>
						<div className='basis-full'>{actionType}</div>
						<div className='flex items-center gap-4 basis-full'>
							<Image
								src={formData.image}
								height={24}
								width={24}
								alt={formData.coinId}
							/>
							{formData.coin}
						</div>
						<div className='basis-full flex justify-end'>
							<ChevronRightIcon height={24} width={24} />
						</div>
					</div>
					<div className='p-4 flex justify-between items-center'>
						<div className='basis-full'>Pay With</div>
						<div className='flex items-center basis-full gap-4'>
							<BanknotesIcon height={24} width={24} color={'green'} />
							Tickr USD
						</div>
						<div className='basis-full flex justify-end'>
							<ChevronRightIcon height={24} width={24} />
						</div>
					</div>
				</div>
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
