import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import InfoBar from '../components/InfoBar'
import { getStaticLikes, getStaticCoin } from '@/app/utils/fetchers'

async function page({ params }: { params: { id: string } }) {
	const coin = await getStaticCoin(params.id)
	const likes = await getStaticLikes(params.id)
	console.log('staticserverlikes', likes)
	console.log('staticservercoin', coin.id)
	return (
		<div>
			<InfoBar coinId={coin.id} staticLikes={likes} />
		</div>
	)
}

export default page
