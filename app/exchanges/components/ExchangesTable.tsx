import Image from 'next/image'
import { exchangeType } from '@/app/utils/types'
import { numParseTwoDecimal } from '@/app/utils/parsers'

type Props = {
	exchanges: exchangeType[]
}

const ExchangesTable = ({ exchanges }: Props) => {
	return (
		<table className='w-full'>
			<thead>
				<tr className='border-t border-b border-slate-200'>
					<th className='text-left py-4'>#</th>
					<th className='text-left'>Name</th>
					<th className='text-right'>Country</th>
					<th className='text-right'>Volume(BTC)</th>
					<th className='text-right'>Established</th>
				</tr>
			</thead>
			<tbody>
				{exchanges.map((exchange) => (
					<tr key={exchange.id} className='border-b border-slate-200'>
						<td className='py-4 text-left'>{exchange.trust_score_rank}</td>
						<td>
							<div className='flex gap-2 flex-start'>
								<Image
									src={exchange.image}
									alt={exchange.name}
									width={24}
									height={24}
								/>
								<span>{exchange.name}</span>
							</div>
						</td>
						<td className='text-right'>{exchange.country || '-'}</td>
						<td className='text-right'>
							{numParseTwoDecimal(exchange.trade_volume_24h_btc)}
						</td>
						<td className='text-right'>{exchange.year_established || '-'}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default ExchangesTable
