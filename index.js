'use strict'

const through = require('through2')

const strictEqual = (a, b) => a === b

module.exports = function (n, cmp) {
	if ('number' !== typeof n) n = 3
	if (n < 2) throw new Error('Length must be higher than 2.')
	if (Math.floor(n) !== n) throw new Error('Length must be an integer.')
	if ('function' !== typeof cmp) cmp = strictEqual

	let queue  = []
	let last   = NaN
	let streak = 0

	return through.obj(function (current, _, cb) {

		if (cmp(last, current)) {
			streak++
			if (streak > n) this.push(current)
			else if (streak === n) {
				for (let i = 0; i < queue.length; i++) this.push(queue[i])
				this.push(current)
			} else queue.push(current)

		} else { queue = [current]; streak = 1 }

		last = current
		cb()
	})
}
