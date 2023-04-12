import { coinView } from '../../utils/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import InfoBar from '../components/InfoBar'
import axios from 'axios'
import { getStaticLikes, getStaticCoin } from '@/app/utils/fetchers'

// const getCoin = async (coinId: string): Promise<coinView> => {
// 	const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
// 		next: { revalidate: 300 },
// 	})

// 	return await res.json()
// }

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
