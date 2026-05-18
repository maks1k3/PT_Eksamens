/**
 * Go to history specific state
 *
 */
function go(n) {
	if (_.isUndefined(navigation_history)) {
		return;
	}
	navigation_history.go(n);
}

export default go;
