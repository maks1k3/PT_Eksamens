/**
 * Go back
 *
 */
function goBack() {
	if (_.isUndefined(navigation_history)) {
		return;
	}
	navigation_history.goBack();
}

export default goBack;
