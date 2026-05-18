import { get } from 'lodash-es';

/**
 * Check if debugMode is on
 *
 *
 */
function isDebugMode() {
	if (typeof store !== 'undefined') {
		return get(store.getState(), 'configuration.debugMode', false);
	} else {
		return false;
	}
}

export default isDebugMode;
