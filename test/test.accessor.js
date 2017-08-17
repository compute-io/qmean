/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	qmean = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor quadratic mean', function tests() {

	it( 'should export a function', function test() {
		expect( qmean ).to.be.a( 'function' );
	});

	it( 'should compute the quadratic mean using an accessor', function test() {
		var data, sum, d, expected;

		data = [
			{'x':3},
			{'x':4}
		];
		expected = 5/Math.SQRT2;

		assert.closeTo( qmean( data, getValue ), expected, 0.001 );

		data = [
			{'x': 3},
			{'x': 4},
			{'x': 20},
			{'x': -10},
			{'x': 0}
		 ];

		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = getValue( data[ i ] );
			sum += d * d;
		}
		expected = Math.sqrt( sum/data.length );

		assert.closeTo( qmean( data, getValue ), expected, 1e-13 );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( qmean( [], getValue ) );

		function getValue( d ) {
			return d.x;
		}
	});

});
