'use strict'

const through = require('through2')

module.exports = function (n, cmp) {
	if ('number' !== typeof n) n = 3
	if (n < 2) throw new Error('Length must be higher than 2.')
	if (Math.floor(n) !== n) throw new Error('Length must be an integer.')
	return 'function' === typeof cmp
		? withComparator(n, cmp)
		: withoutComparator(n)
}



const withoutComparator = (length) => {
	let last = NaN // `NaN === NaN` is false
	let count = 0

	return through.obj(function (current, _, cb) {
		if (last === current) {
			if (++count === length)
				while (count-- > 0) this.push(current)
		} else {
			count = 1
			last = current
		}
		cb()
	})
}

const withComparator = (length, compare) => {
	let last = NaN // `NaN === NaN` is false
	let queue = []

	return through.obj(function (current, _, cb) {
		if (compare(last, current)) {
			queue.push(current)
			if (queue.length === length) {
				for (let x of queue) this.push(x)
				queue = []
			}
		} else {
			queue = []
			last = current
		}
		cb()
	})
}
