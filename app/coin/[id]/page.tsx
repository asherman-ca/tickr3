import { coinView } from '../../utils/types'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import InfoBar from '../components/InfoBar'

const getCoin = async (coinId: string): Promise<coinView> => {
	const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
		next: { revalidate: 300 },
	})

	return await res.json()
}

async function page({ params }: { params: { id: string } }) {
	const coin = await getCoin(params.id)
	// const session = await getServerSession(authOptions)
	return (
		<div>
			<InfoBar coinId={coin.id} />
		</div>
	)
}

export default page
