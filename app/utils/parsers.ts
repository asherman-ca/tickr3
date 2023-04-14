export const numParse = (num: number): string => {
	const f = Intl.NumberFormat('en-us', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	const smlF = Intl.NumberFormat('en-us', {
		minimumFractionDigits: 6,
	})

	if (num < 0.1) {
		return smlF.format(num)
	} else if (num > 1000000000) {
		return f.format(num / 1000000000) + 'B'
	} else if (num > 1000000) {
		return f.format(num / 1000000) + 'M'
	}
	return f.format(num)
}

export const numParseNoDecimal = (num: number): string => {
	const f = Intl.NumberFormat('en-us', {
		maximumFractionDigits: 0,
	})
	return f.format(num)
}

export const numParseTwoDecimal = (num: number): string => {
	const f = Intl.NumberFormat('en-us', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
	return f.format(num)
}

export const moneyParse = (num: number): string => {
	if (num) {
		const options = {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 2,
		}

		const smlOptions = {
			style: 'currency',
			currency: 'USD',
			minimumFractionDigits: 6,
		}

		if (num < 0.1) {
			return num.toLocaleString('en-US', smlOptions)
		} else if (num > 1000000000) {
			return (num / 1000000000).toLocaleString('en-US', options) + 'B'
		} else if (num > 1000000) {
			return (num / 1000000).toLocaleString('en-US', options) + 'M'
		}
		return num.toLocaleString('en-US', options)
	} else {
		return `$0.00`
	}
}

export const classNamer = (num: number): string => {
	if (num > 0) {
		return 'pos'
	} else if (num < 0) {
		return 'neg'
	}
	return ''
}
