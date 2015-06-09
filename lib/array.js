'use strict';

/**
* FUNCTION: qmean( arr )
*	Calculates the quadratic mean (root mean square) of a numeric array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number|Null} quadratic mean or null
*/
function qmean( arr ) {
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
		val = arr[ i ];
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
