/**
*
*	COMPUTE: qmean
*
*
*	DESCRIPTION:
*		- Computes the quadratic mean (root mean square) of an array of values.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	// QMEAN //

	/**
	* FUNCTION: qmean( arr )
	*	Calculates the quadratic mean (root mean square) of an array of values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} quadratic mean
	*/
	function qmean( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'qmean()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			t = 0,
			s = 1,
			r,
			val,
			abs;
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

})();