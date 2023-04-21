import { likeType, coinType, sessionType } from '@/app/utils/types'
import { useQuery } from '@tanstack/react-query'
import { getUserLikes } from '@/app/utils/fetchers'

const WatchListTable = ({
	coins,
	session,
}: {
	coins: coinType[]
	session: sessionType
}) => {
	const { data, error, isLoading, isFetching }: any = useQuery({
		queryFn: () => getUserLikes(session.user.id),
		queryKey: ['userLikes'],
	})

	const likeIds = data.map((like: likeType) => like.coinId)
	const coinPairs: coinType[] = coins.filter((coin) =>
		likeIds.includes(coin.id)
	)

	return (
		<table>
			<thead>
				<tr>
					<th className='text-left'>Symbol</th>
					<th className='text-right'>Price</th>
					<th className='text-right'>Change</th>
					<th className='text-right'>Change %</th>
				</tr>
			</thead>
			<tbody>
				{coinPairs.map((coin) => (
					<tr key={coin.id}>
						<td className='text-left'>{coin.name}</td>
						<td className='text-right'>{coin.current_price}</td>
						<td className='text-right'>
							{coin.price_change_percentage_1h_in_currency}
						</td>
						<td className='text-right'>
							{coin.price_change_percentage_24h_in_currency}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default WatchListTable
