'use client'
import { coinType } from '@/app/utils/types'
import PurchaseForm from './PurchaseForm'
import { useState } from 'react'
import OrderList from './OrderList'
import { useQuery } from '@tanstack/react-query'
import { getUserProfile } from '@/app/utils/fetchers'
import Loader from '@/app/components/Loader'
import { useSession } from 'next-auth/react'

type Props = {
	coins: coinType[]
	session: any
}

const Testnet = ({ coins, session }: Props) => {
	const [modalActive, setModalActive] = useState(false)
	const { data: clientSession, status: sessionStatus }: any = useSession()
	const {
		data: user,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryFn: () => getUserProfile(clientSession.user.id),
		queryKey: [`user`],
		refetchOnWindowFocus: false,
	})

	if (isLoading) return <Loader />

	return (
		<div className='py-8 flex flex-col md:flex-row px-12 gap-4 flex-1'>
			{modalActive && (
				<div
					className='absolute top-0 left-0 w-screen h-screen z-[75] bg-black opacity-50'
					onClick={() => setModalActive(false)}
				></div>
			)}
			<OrderList orders={user?.orders || []} />
			<PurchaseForm
				coins={coins}
				modalActive={modalActive}
				setModalActive={setModalActive}
				balance={user?.balance || 0}
			/>
		</div>
	)
}

export default Testnet
