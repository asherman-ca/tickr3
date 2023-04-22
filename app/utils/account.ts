import { coinType } from './types'

const calcPNL = (orders: any[], coins: coinType[]) => {
	let accounts = {} as any

	let buys = orders.filter((order: any) => order.type === 'Buy')

	let sells = orders.filter((order: any) => order.type === 'Sell')

	buys?.forEach((order: any) => {
		if (!accounts[order.coin]) {
			accounts[order.coin] = {
				coin: order.coin,
				amount: order.amount,
				total: order.amount / order.price,
				totalSold: 0,
				earn: 0,
				coinId: order.coinId,
				image: order.image,
			}
		} else {
			accounts[order.coin].amount += order.amount
			accounts[order.coin].total += order.amount / order.price
		}
	})

	Object.values(accounts).forEach((account: any) => {
		accounts[account.coin].averagePrice = account.amount / account.total
	})

	sells?.forEach((order: any) => {
		accounts[order.coin].total -= order.amount / order.price
		accounts[order.coin].earn += order.amount
		accounts[order.coin].totalSold += order.amount / order.price
	})

	let PNL = [] as any

	Object.values(accounts).forEach((account: any) => {
		if (coins?.filter((coin: any) => coin.name === account.coin).length > 0) {
			const currentPrice = coins?.filter(
				(coin: any) => coin.name === account.coin
			)[0].current_price

			PNL.push({
				coin: account.coin,
				pnl:
					account.total *
					account.averagePrice *
					(currentPrice / account.averagePrice - 1),
				totalCoins: account.total,
				averagePrice: account.averagePrice,
				totalValue: currentPrice * account.total,
				rpnl: account.earn - account.totalSold * account.averagePrice,
				coinId: account.coinId,
				image: account.image,
			})
		}
	})

	PNL.sort((a: any, b: any) => b.totalValue - a.totalValue)

	return PNL
}

export { calcPNL }
