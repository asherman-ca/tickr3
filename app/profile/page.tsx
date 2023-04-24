import { getStaticCoins, getUserProfile } from '../utils/fetchers'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Login from '../components/Login'
import ProfileTable from './components/ProfileTable'
import { redirect } from 'next/navigation'

export const revalidate = 0

async function page() {
	const session = await getServerSession(authOptions)

	if (!session) {
		redirect('/')
	}

	if (!session) {
		return (
			<div className='flex flex-col justify-center items-center flex-1 gap-4'>
				<div className='text-2xl font-bold'>Login Required</div>
				<Login />
			</div>
		)
	}

	const userData = await getUserProfile(session.user.id)
	const coins = await getStaticCoins()

	return (
		<div className='flex flex-col py-8 gap-4'>
			<div className='text-2xl font-bold px-12'>Profile</div>
			<ProfileTable user={userData} coins={coins} session={session} />
		</div>
	)
}

export default page
