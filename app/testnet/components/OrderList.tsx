import { getOrders } from '@/app/utils/fetchers'
import { useQuery, useQueryClient } from '@tanstack/react-query'

const OrderList = () => {
	const {
		data: orders,
		error,
		isLoading,
		isFetching,
	} = useQuery({
		queryFn: () => getOrders(),
		queryKey: [`orders`],
	})

	{
		console.log(orders, 'orders')
	}

	return (
		<div className='basis-5/6 bg-white shadow-sm border border-gray-200 rounded-md py-4 flex flex-col gap-4'>
			<div className='text-xl font-semibold px-4'>Orders</div>
			<table>
				<thead>
					<tr>
						<th className='px-4 py-2'>Time Placed</th>
						<th className='px-4 py-2'>Type</th>
						<th className='px-4 py-2'>Coin</th>
						<th className='px-4 py-2'>Amount</th>
						<th className='px-4 py-2'>Price</th>
					</tr>
				</thead>
				<tbody>
					{orders &&
						orders.map((order: any) => {
							return (
								<tr key={order.id}>
									<td className='px-4 py-2'>{order.createdAt}</td>
									<td className='px-4 py-2'>{order.type}</td>
									<td className='px-4 py-2'>{order.coinId}</td>
									<td className='px-4 py-2'>{order.amount}</td>
									<td className='px-4 py-2'>{order.price}</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default OrderList
