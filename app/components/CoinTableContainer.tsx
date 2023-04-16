import { getUserLikes } from '../utils/fetchers'
import CoinTable from './CoinTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { coinTableType } from '../utils/types'

const CoinTableContainer = async ({ coins }: { coins: coinTableType[] }) => {
	const session = await getServerSession(authOptions)
	const initialLikes = session ? await getUserLikes(session.user.id) : []
	if (initialLikes.length > 0) {
		coins.map((coin) => {
			coin.liked = initialLikes.some((like) => like.coinId === coin.id)
			return coin
		})
	}

	return <CoinTable coins={coins} initialLikes={initialLikes} />
}

export default CoinTableContainer
