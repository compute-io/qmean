'use strict';

/**
* FUNCTION: qmean( arr, clbk )
*	Computes the quadratic mean of an array using an accessor function.
*
* @param {Array} arr - input array
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} quadratic mean or null
*/
function qmean( arr, clbk ) {
	var len = arr.length,
		t = 0,
		s = 1,
		r,
		val,
		abs;

	if ( !len ) {
		return null;
	}
	for ( var i = 0; i < len; i++ ) {
		val = clbk( arr[ i ], i );
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
	return t * Math.sqrt( s/len );
} // end FUNCTION qmean()


// EXPORTS //

module.exports = qmean;
