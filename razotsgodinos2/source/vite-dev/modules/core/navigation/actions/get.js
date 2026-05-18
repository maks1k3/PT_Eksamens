import { isUndefined, get as getFunc } from 'lodash-es';

/**
 * Get current navigation
 *
 */
function get() {
	if (isUndefined(store)) {
		return {
			action: null,
			path: null,
			params: null,
			hash: null,
			state: null,
		};
	}
	return _g.cloneDeep(getFunc(store.getState(), 'navigation.current'));
}

export default get;
