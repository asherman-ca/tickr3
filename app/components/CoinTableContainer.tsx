import {
	getStaticGlobal,
	getStaticCoins,
	getUserLikes,
} from '../utils/fetchers'
import CoinTable from './CoinTable'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { coinType } from '../utils/types'

const CoinTableContainer = async ({ coins }: { coins: coinType[] }) => {
	const session = await getServerSession(authOptions)
	const initialLikes = session ? await getUserLikes(session.user.id) : []
	return <CoinTable coins={coins} initialLikes={initialLikes} />
}

export default CoinTableContainer
