import Image from 'next/image'
import { exchangeType } from '@/app/utils/types'
import { numParseTwoDecimal } from '@/app/utils/parsers'

type Props = {
	exchanges: exchangeType[]
}

const ExchangesTable = ({ exchanges }: Props) => {
	if (exchanges.length < 1) {
		return <div>Fetch Error</div>
	}

	return (
		<table className='w-full'>
			<thead>
				<tr className='border-t border-b border-slate-200'>
					<th className='text-left py-4'>#</th>
					<th className='text-left'>Name</th>
					<th className='text-right hidden md:table-cell'>Score</th>
					<th className='text-right hidden md:table-cell'>Country</th>
					<th className='text-right'>Volume(BTC)</th>
					<th className='text-right hidden md:table-cell'>Established</th>
				</tr>
			</thead>
			<tbody>
				{exchanges.map((exchange) => (
					<tr key={exchange.id} className='border-b border-slate-200'>
						<td className='py-4 text-left'>{exchange.trust_score_rank}</td>
						<td>
							<a
								href={exchange.url}
								className='flex gap-2 flex-start items-center'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={exchange.image}
									alt={exchange.name}
									width={24}
									height={24}
								/>
								<span className='font-medium'>{exchange.name}</span>
							</a>
						</td>
						<td className='text-right hidden md:table-cell'>
							<div
								className={`py-1 px-4 rounded-md w-fit ml-auto ${
									exchange.trust_score > 8 ? 'bg-green-400' : 'bg-orange-400'
								}`}
							>
								{exchange.trust_score}
							</div>
						</td>
						<td className='text-right hidden md:table-cell'>
							{exchange.country || '-'}
						</td>
						<td className='text-right'>
							{numParseTwoDecimal(exchange.trade_volume_24h_btc)}
						</td>
						<td className='text-right hidden md:table-cell'>
							{exchange.year_established || '-'}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default ExchangesTable
