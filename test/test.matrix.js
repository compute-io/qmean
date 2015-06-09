/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	qmean = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix quadratic mean', function tests() {

	var data,
		mat, mat2,
		i;

	data = new Int8Array( 25 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i;
	}

	beforeEach( function before() {
		mat = matrix( data, [5,5], 'int8' );
		mat2 = matrix( [ -2, 2, 3, 3 ], [2,2]);
	});

	it( 'should export a function', function test() {
		expect( qmean ).to.be.a( 'function' );
	});

	it( 'should compute the quadratic mean along matrix columns', function test() {
		var out, mu, expected;

		out = matrix( [5,1], 'int8' );

		mu = qmean( out, mat );
		expected = '2;7;12;17;22';

		assert.strictEqual( mu.toString(), expected );

		mu = qmean( out, mat, 2 );
		expected = '2;7;12;17;22';

		assert.strictEqual( mu.toString(), expected );

		// Flip a matrix up-down:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		mu = qmean( out, mat );
		expected = '22;17;12;7;2';

		assert.strictEqual( mu.toString(), expected, 'flipud' );

		out = matrix( [2,1], 'int8' );

		mu = qmean( out, mat2 );
		expected = '2;3';

		assert.strictEqual( mu.toString(), expected );

	});

	it( 'should compute the quadratic mean along matrix rows', function test() {
		var out, mu, expected;

		out = matrix( [1,5], 'int8' );

		mu = qmean( out, mat, 1 );
		expected = '12,13,13,14,15';

		assert.strictEqual( mu.toString(), expected );

		// Flip a matrix left-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		mu = qmean( out, mat, 1 );
		expected = '15,14,13,13,12';

		assert.strictEqual( mu.toString(), expected, 'fliplr' );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( qmean( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( qmean( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( qmean( out, mat ) );
	});

});
