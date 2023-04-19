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
		<div className='basis-5/6 bg-white shadow-sm border border-gray-200 rounded-md p-4'>
			{orders &&
				orders.map((order: any) => {
					return <div key={order.id}>{order.type}</div>
				})}
		</div>
	)
}

export default OrderList
