import { getUserProfile } from '../utils/fetchers'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { getServerSession } from 'next-auth'
import Login from '../components/Login'
import ProfileTable from './components/ProfileTable'

async function page() {
	const session = await getServerSession(authOptions)

	if (!session) {
		return (
			<div className='flex flex-col justify-center items-center flex-1 gap-4'>
				<div className='text-2xl font-bold'>Login Required</div>
				<Login />
			</div>
		)
	}

	const userData = await getUserProfile(session.user.id)

	return (
		<div className='flex flex-col py-8 gap-4'>
			<div className='text-2xl font-bold px-12'>Profile</div>
			<ProfileTable user={userData} />
		</div>
	)
}

export default page
