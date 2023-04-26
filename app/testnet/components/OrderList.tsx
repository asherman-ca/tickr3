import Image from 'next/image'
import { moneyParse } from '@/app/utils/parsers'

const OrderList = ({ orders }: any) => {
	return (
		<div className='basis-5/6 bg-white shadow-sm border border-gray-200 rounded-md py-4 flex flex-col gap-4'>
			<div className='text-xl font-semibold px-4'>Orders</div>
			<table>
				<thead>
					<tr className='border-b border-gray-200'>
						<th className='py-4 pl-4 text-left'>Time Placed</th>
						<th className='text-left'>Type</th>
						<th className='text-right'>Coin</th>
						<th className='text-right'>$Value</th>
						<th className='pr-4 text-right'>Price/Coin</th>
					</tr>
				</thead>
				<tbody>
					{orders &&
						orders.map((order: any) => {
							const date = new Date(order.createdAt)
							const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
							return (
								<tr key={order.id} className='border-b border-gray-200'>
									<td className='py-4 pl-4 text-left'>{formattedDate}</td>
									<td
										className={`text-left ${
											order.type === 'Buy' ? 'text-green-500' : 'text-red-500'
										}`}
									>
										{order.type}
									</td>
									<td>
										<div className='flex items-center justify-end gap-2'>
											<div>{order.coin}</div>
											<Image
												src={order.image}
												height={24}
												width={24}
												alt={order.coinId}
											/>
										</div>
									</td>
									<td className='text-right'>{moneyParse(order.amount)}</td>
									<td className='pr-4 text-right'>{moneyParse(order.price)}</td>
								</tr>
							)
						})}
				</tbody>
			</table>
		</div>
	)
}

export default OrderList
