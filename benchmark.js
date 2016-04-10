'use strict'

const keepSequencesStream = require('./index')
const Benchmark           = require('benchmark')

const suite = new Benchmark.Suite()



const n3 =  keepSequencesStream(3).on('data', () => {})
const n10 = keepSequencesStream(10).on('data', () => {})
const n20 = keepSequencesStream(20).on('data', () => {})
suite



.add('n = 3 – 10k of [0, 1, 2]', () => {
	let i = 10000
	while(i-- > 0)
		n3.write(Math.round(Math.random() * 2))
})

.add('n = 10 – 10k of [0, 1, 2]', () => {
	let i = 10000
	while(i-- > 0)
		n10.write(Math.round(Math.random() * 2))
})

.add('n = 20 – 10k of [0, 1, 2]', () => {
	let i = 10000
	while(i-- > 0)
		n20.write(Math.round(Math.random() * 2))
})



.on('cycle', (e) => console.log(e.target.toString()))
.run({async: true})
