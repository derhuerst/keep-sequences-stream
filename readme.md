# keep-sequences-stream 🔍

**Pass through sequences with minimum length.**

```js
// minimum length is 3
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

`keepSequencesStream([n], [comparator])`

Returns a [duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex) [in object mode](https://nodejs.org/api/stream.html#stream_object_mode).

`n` is the sequence length, with `3` as default. Default `comparator` is [`===`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity), but you can pass any function that returns `true` or `false`.

### Example

```js
const keepSequencesStream = require('keep-sequences-stream')

let s = keepSequencesStream(2)
for (let x of [3, -1, -1, 2, -1]) s.write(x)
s.on('data', console.log) // `-1` will be logged twice
```

### Things to keep in mind

Because `comparator` can *implicate* equality for values that may not be strictly equal (`===`), there must be an array of values in the current sequence. So **for `n = 1000`, up to 1000 elements will be kept in memory**, which kind of defeats the purpose of a stream.

Just comparing strictly (`===`) would be more memory-efficient, as the last equal value could just be emitted `n` times.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/keep-sequences-stream/issues).
