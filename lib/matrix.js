'use strict';

/**
* FUNCTION: qmean( out, mat[, dim] )
*	Computes the quadratic mean along a matrix dimension.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute an quadratic mean. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} quadratic means or null
*/
function qmean( out, mat, dim ) {
	var t, s, r,
		val, abs,
		M, N,
		s0, s1,
		o,
		i, j, k;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		t = 0;
		s = 1;
		for ( j = 0; j < N; j++ ) {
			val = mat.data[ k + j*s1 ];
			abs = val;
			if ( abs < 0 ) {
				abs = -abs;
			}
			if ( abs > 0 ) {
				if ( abs > t ) {
					r = t / val;
					s = 1 + s*r*r;
					t = abs;
				} else {
					r = val / t;
					s = s + r*r;
				}
			}
		}
		out.data[ i ] =  t * Math.sqrt( s/N );
	}
	return out;
} // end FUNCTION qmean()


// EXPORTS //

module.exports = qmean;
