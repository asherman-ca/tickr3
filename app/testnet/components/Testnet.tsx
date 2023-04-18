'use client'
// import { useRouter } from 'next/navigation'
import { coinType } from '@/app/utils/types'
import PurchaseForm from './PurchaseForm'
// import { toast } from 'react-hot-toast'
// import { useSession } from 'next-auth/react'

type Props = {
	coins: coinType[]
	session: any
}

const Testnet = ({ coins, session }: Props) => {
	// const router = useRouter()
	// const { data: session, status: sessionStatus }: any = useSession()

	// if (!session) {
	// 	toast.error('Must be logged in')
	// 	router.push('/')
	// }
	console.log('coins', coins)
	console.log('session', session)
	return (
		<div className='py-8 flex flex-col md:flex-row px-12 gap-4'>
			<div className='basis-4/6 bg-white shadow-sm border border-gray-200 rounded-md p-4'>
				List
			</div>
			<PurchaseForm coins={coins} />
		</div>
	)
}

export default Testnet
