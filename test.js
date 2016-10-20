'use strict'

const sink    = require('stream-sink')
const assert  = require('assert')

const kSS     = require('./index')
const noop = () => {}

noop(([



	  [kSS(), [1, 1, 1], [1, 1, 1]]
	, [kSS(), [3, 1, 1, 1, 2], [1, 1, 1]]
	, [kSS(), [1, 2, 2, 2, 3], [2, 2, 2]]
	, [kSS(4), [3, 1, 1, 1, 1, 2], [1, 1, 1, 1]]
	, [kSS(2), [1, -1, -1, 2], [-1, -1]]
	, [kSS(3, () => true), [1, -1, 3], [1, -1, 3]]



]).forEach((data) => {
	const stream = data[0]
	const input = data[1]
	const expected = data[2]

	stream.pipe(sink('object'))
	.then((actual) => {
		assert.deepStrictEqual(actual, expected)
		console.info(input.join(' '), '->', expected.join(' '))
	})
	.catch(assert.fail)

	for (let value of input) stream.write(value)
	stream.end()
}))
