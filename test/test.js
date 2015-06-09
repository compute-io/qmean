/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	qmean = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-qmean', function tests() {

	it( 'should export a function', function test() {
		expect( qmean ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
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

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				qmean( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				qmean( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the quadratic mean', function test() {
		var data, expected;

		data = [ 3, 4 ];
		expected = 5/Math.SQRT2;

		assert.closeTo( qmean( data ), expected, 0.001 );
	});

	it( 'should compute the quadratic mean of a typed array', function test() {
		var data, expected;

		data = new Int8Array( [ 3, 4 ] );
		expected = 5/Math.SQRT2;

		assert.closeTo( qmean( data ), expected, 0.001 );
	});

	it( 'should compute the quadratic mean using an accessor function', function test() {
		var data, expected, actual;

		data = [
			{'x':3},
			{'x':4}
		];

		expected = 5/Math.SQRT2;
		actual = qmean( data, {
			'accessor': getValue
		});

		assert.closeTo( actual, expected, 0.001 );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the quadratic mean along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			mu,
			i;

		data = new Int8Array( 25 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i;
		}
		mat = matrix( data, [5,5], 'int8' );

		// Default:
		mu = qmean( mat );
		expected = '2.449489742783178;7.14142842854285;12.083045973594572;17.05872210923198;22.045407685048602';

		assert.strictEqual( mu.toString(), expected, 'default' );

		// Along columns:
		mu = qmean( mat, {
			'dim': 2
		});
		expected = '2.449489742783178;7.14142842854285;12.083045973594572;17.05872210923198;22.045407685048602';

		assert.strictEqual( mu.toString(), expected, 'dim: 2' );

		// Along rows:
		mu = qmean( mat, {
			'dim': 1
		});
		expected = '12.24744871391589,13.076696830622021,13.92838827718412,14.798648586948744,15.684387141358123';

		assert.strictEqual( mu.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the quadratic mean of 1d matrices (vectors)', function test() {
		var data, mat;

		data = [ 3, 4 ];

		// Row vector:
		mat = matrix( data, [1,2], 'int8' );
		assert.closeTo( qmean( mat ), 5/Math.SQRT2, 0.001 );

		// Column vector:
		mat = matrix( data, [2,1], 'int8' );
		assert.closeTo( qmean( mat ), 5/Math.SQRT2, 0.001 );
	});

});
