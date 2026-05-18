/**
 * Go forward
 *
 */
function goForward() {
	if (_.isUndefined(navigation_history)) {
		return;
	}
	navigation_history.goForward();
}

export default goForward;
