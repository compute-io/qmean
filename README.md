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

To use the module,

``` javascript
var qmean = require( 'compute-qmean' );
```

#### qmean( arr )

Computes the quadratic mean (root mean square) of an `array` of values.

``` javascript
var data = [ 2, 7, 3, -3, 9 ];

var mu = qmean( data );
// returns ~5.5136
```


## Examples

``` javascript
var qmean = require( 'compute-qmean' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}

console.log( qmean( data ) );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The algorithm to compute the quadratic mean first calculates the _L2_ norm before dividing by the square root of the `array` length. This particular implementation attempts to avoid overflow and underflow and is accurate to `<1e-13` compared to the canonical formula for calculating the root mean square.


## References

- 	Dahlquist, Germund and Bjorck, Ake. _Numerical Methods in Scientific Computing_.
- 	Blue, James (1978) "A Portable Fortran Program To Find the Euclidean Norm of a Vector". _ACM Transactions on Mathematical Software_.
- 	Higham, Nicholas J. _Accuracy and Stability of Numerical Algorithms, Second Edition_.

This module implements a one-pass algorithm proposed by S.J. Hammarling.



## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


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