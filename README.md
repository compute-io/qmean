Quadratic Mean
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the quadratic mean ([root mean square; rms](http://en.wikipedia.org/wiki/Root_mean_square)) of an array of values.


## Installation

``` bash
$ npm install compute-qmean
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage


``` javascript
var qmean = require( 'compute-qmean' );
```

#### qmean( x[, opts] )

Computes the quadratic mean (root mean square). `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).


``` javascript
var data, mu;

data = [ 2, 7, 3, -3, 9 ];

mu = qmean( data );
// returns ~5.5136

data = new Int8Array( data );
mu = qmean( data );
// returns ~5.5136
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':2},
	{'x':7},
	{'x':3},
	{'x':-3},
	{'x':9}
];

function getValue( d, i ) {
	return d.x;
}

var mu = qmean( data, {
	'accessor': getValue
});
// returns ~5.5136
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [quadratic mean](ttp://en.wikipedia.org/wiki/Root_mean_square). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [quadratic mean](http://en.wikipedia.org/wiki/Root_mean_square) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	mu,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = qmean( mat );
/*
	[  2.449
	   7.141
	  12.083
	  17.059
	  22.045 ]
*/
```

To compute the [quadratic mean](ttp://en.wikipedia.org/wiki/Root_mean_square) along the rows, set the `dim` option to `1`.

``` javascript
mu = qmean( mat, {
	'dim': 1
});
/*
	[ 12.247, 13.077, 13.928, 14.799, 15.684 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
mu = qmean( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 12, 13, 13, 14, 15 ]
*/

var dtype = mu.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
mu = qmean( mat );
// returns ~4.509

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
mu = qmean( mat );
// returns ~4.509
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
mu = qmean( [] );
// returns null

mu = qmean( new Int8Array( [] ) );
// returns null

mu = qmean( matrix( [0,0] ) );
// returns null

mu = qmean( matrix( [0,10] ) );
// returns null

mu = qmean( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	qmean = require( 'compute-qmean' );

var data,
	mat,
	mu,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = qmean( data );
console.log( 'Arrays: %d\n', mu );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
mu = qmean( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', mu );


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
mu = qmean( data );
console.log( 'Typed arrays: %d\n', mu );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
mu = qmean( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', mu.toString() );


// ----
// Matrices (along columns)...
mu = qmean( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', mu.toString() );


// ----
// Matrices (custom output data type)...
mu = qmean( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', mu.dtype, mu.toString() );

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The algorithm to compute the quadratic mean first calculates the _L2_ norm before dividing by the square root of the number of elements. This particular implementation attempts to avoid overflow and underflow and is accurate to `<1e-13` compared to the canonical formula for calculating the root mean square.


## References

- 	Dahlquist, Germund and Bjorck, Ake. _Numerical Methods in Scientific Computing_.
- 	Blue, James (1978) "A Portable Fortran Program To Find the Euclidean Norm of a Vector". _ACM Transactions on Mathematical Software_.
- 	Higham, Nicholas J. _Accuracy and Stability of Numerical Algorithms, Second Edition_.

This module implements a one-pass algorithm proposed by S.J. Hammarling.



## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The Compute.io Authors.

[npm-image]: http://img.shields.io/npm/v/compute-qmean.svg
[npm-url]: https://npmjs.org/package/compute-qmean

[travis-image]: http://img.shields.io/travis/compute-io/qmean/master.svg
[travis-url]: https://travis-ci.org/compute-io/qmean

[coveralls-image]: https://img.shields.io/coveralls/compute-io/qmean/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/qmean?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/qmean.svg
[dependencies-url]: https://david-dm.org/compute-io/qmean

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/qmean.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/qmean

[github-issues-image]: http://img.shields.io/github/issues/compute-io/qmean.svg
[github-issues-url]: https://github.com/compute-io/qmean/issues
