/**
 * Generate GET params
_g.param({a:1,b:2});
"a=1&b=2"

 * @param {Object} params - params
 * @return {String} url get params
 */
function param(params) {
	return Object.keys(params)
		.map(function(k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
		})
		.join('&');
}

export default param;
