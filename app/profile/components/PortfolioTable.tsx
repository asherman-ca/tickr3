import { accountType } from '@/app/utils/types'
import { numParseTwoDecimal, moneyParseTwoDecimal } from '@/app/utils/parsers'

const PortfolioTable = ({ accounts }: { accounts: accountType[] | [] }) => {
	return (
		<table>
			<thead>
				<tr className='border-b border-slate-200'>
					<th className='text-left py-4'>Coin</th>
					<th className='text-right'>Value</th>
					<th className='text-right'>Average Price</th>
					<th className='text-right'>Total Coins</th>
					<th className='text-right'>U/PNL</th>
					<th className='text-right'>PNL</th>
				</tr>
			</thead>
			<tbody>
				{accounts?.map((account: accountType) => (
					<tr className='border-b border-slate-200'>
						<td className='text-left py-4 font-medium'>{account.coin}</td>
						<td className='text-right font-medium'>
							{moneyParseTwoDecimal(account.totalValue)}
						</td>
						<td className='text-right'>
							{moneyParseTwoDecimal(account.averagePrice)}
						</td>
						<td className='text-right'>
							{numParseTwoDecimal(account.totalCoins)}
						</td>
						<td className='text-right'>{moneyParseTwoDecimal(account.pnl)}</td>
						<td className='text-right'>{moneyParseTwoDecimal(account.rpnl)}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

export default PortfolioTable
