
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	qmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-qmean', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( qmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided an array', function test() {
		var values = [
				'5',
				5,
				null,
				undefined,
				NaN,
				true,
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				qmean( value );
			};
		}
	});

	it( 'should return the quadratic mean', function test() {
		var data, expected;

		data = [ 3, 4 ];
		expected = 5/Math.SQRT2;

		assert.closeTo( qmean( data ), expected, 1e-13 );
	});

	it( 'should return the quadratic mean', function test() {
		var data, d, sum, expected;

		data = [ 3, 4, 20, -10, 0 ];
		sum = 0;
		for ( var i = 0; i < data.length; i++ ) {
			d = data[ i ];
			sum += d * d;
		}
		expected = Math.sqrt( sum/data.length );

		assert.closeTo( qmean( data ), expected, 1e-13 );
	});

});