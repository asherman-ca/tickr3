import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

import { getStaticLikes, getStaticCoin } from '@/app/utils/fetchers'
import InfoBar from '../components/InfoBar'
import TickrBar from '../components/TickrBar'

async function page({ params }: { params: { id: string } }) {
	const coin = await getStaticCoin(params.id)
	const likes = await getStaticLikes(params.id)
	return (
		<div className='layout'>
			<InfoBar coinId={coin.id} staticLikes={likes} />
			<TickrBar />
			<div>{coin.description.en.replace(/<\/?a[^>]*>/g, '')}</div>
		</div>
	)
}

export default page
