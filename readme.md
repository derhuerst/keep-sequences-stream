# keep-sequences-stream 🔍

**Pass through sequences with minimum length.**

```js
// sequence length is 3
[1, 2, 2, 2, 2, 3, 3, 1, 1, 1, 3] // input
[   2, 2, 2, 2,       1, 1, 1   ] // output
```

[![npm version](https://img.shields.io/npm/v/keep-sequences-stream.svg)](https://www.npmjs.com/package/keep-sequences-stream)
[![build status](https://img.shields.io/travis/derhuerst/keep-sequences-stream.svg)](https://travis-ci.org/derhuerst/keep-sequences-stream)
[![dependency status](https://img.shields.io/david/derhuerst/keep-sequences-stream.svg)](https://david-dm.org/derhuerst/keep-sequences-stream#info=dependencies)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/keep-sequences-stream.svg)](https://david-dm.org/derhuerst/keep-sequences-stream#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/keep-sequences-stream.svg)


## Installing

```
npm install keep-sequences-stream
```


## Usage

`keepSequencesStream([length], [comparator])`

`keepSequencesStream(…)` returns a [duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex) [in object mode](https://nodejs.org/api/stream.html#stream_object_mode).

Default `length` is `3`. Default `comparator` is [`===`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity).

### Example

```js
const keepSequencesStream = require('keep-sequences-stream')

let s = keepSequencesStream(2)
s.on('data', console.log)

for (let x of [3, -1, -1, 2, -1]) s.write(x)
// `-1` will be logged twice
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/keep-sequences-stream/issues).
