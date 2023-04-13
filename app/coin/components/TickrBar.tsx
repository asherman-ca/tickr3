import { marketType } from '@/app/utils/types'
import cuid from 'cuid'
import Image from 'next/image'
import { moneyParse } from '@/app/utils/parsers'

function TickrBar({
	markets,
	title,
}: {
	title: string
	markets: marketType[]
}) {
	return (
		<div className='flex flex-col gap-2 px-12 py-4 border-b-2 border-slate-200'>
			<div className='text-xl font-medium'>{title} Markets</div>
			<table className=''>
				<thead className=''>
					<tr>
						<th className='text-start'>#</th>
						<th className='text-start'>Source</th>
						<th className='text-start'>Pairs</th>
						<th className='text-end'>Price</th>
						<th className='text-end'>Volume</th>
						<th className='text-end'>Confidence</th>
						<th className='text-end'>Updated</th>
					</tr>
				</thead>
				<tbody className='font-normal'>
					{markets.map((market, idx) => (
						<tr key={cuid()} className='hover:bg-blue-50'>
							<td className='text-start py-2 font-medium'>{idx + 1}</td>
							<td className='text-start font-medium'>
								<a
									href={`${market.trade_url}`}
									target='_blank'
									rel='noopener noreferrer'
								>
									{market.market.name}
								</a>
							</td>
							<td className='font-medium'>
								<div className='text-start flex items-center gap-1'>
									<span className='flex items-center gap-1'>
										<Image
											src={`/target_icons/${market.target}.png`}
											height={18}
											width={18}
											alt='target icon'
										/>
										{market.base} /
									</span>
									<span>{market.target}</span>
								</div>
							</td>
							<td className='text-end font-medium'>
								{moneyParse(market.last)}
							</td>
							<td className='text-end'>
								{moneyParse(market.converted_volume.usd)}
							</td>
							<td>
								<div className='flex justify-end text-xs'>
									{market.trust_score === 'green' ? (
										<div className='bg-green-400 rounded-full py-1 px-2'>
											High
										</div>
									) : (
										<div className='bg-red-400 rounded-full py-1 px-2'>Low</div>
									)}
								</div>
							</td>
							<td className='text-end'>Recently</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default TickrBar
