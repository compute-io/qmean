/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	qmean = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array quadratic mean', function tests() {

	it( 'should export a function', function test() {
		expect( qmean ).to.be.a( 'function' );
	});

	it( 'should compute the quadratic mean', function test() {
		var data, d, sum, expected;

		data = [ 3, 4 ];
		expected = 5/Math.SQRT2;

		assert.closeTo( qmean( data ), expected, 0.001 );

		data = [ 3, 4, 20, -10, 0 ];
		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = data[ i ];
			sum += d * d;
		}
		expected = Math.sqrt( sum/data.length );

		assert.closeTo( qmean( data ), expected, 1e-13 );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( qmean( [] ) );
	});

});
