import { has, isNull, toString } from 'lodash-es';

/**
 * Update location params ky
 *
 */
function updateParamsKey(key, value, method = 'push') {
	const current = navigation.get();

	if (isNull(current.params)) {
		current.params = {};
	}

	if (isNull(value)) {
		if (has(current.params, key)) {
			delete current.params[key];
			navigation.updateParams(current.params, method);
		}
	} else {
		if (has(current.params, key)) {
			if (toString(current.params[key]) !== toString(value)) {
				current.params[key] = value;
				navigation.updateParams(current.params, method);
			}
		} else {
			current.params[key] = value;

			navigation.updateParams(current.params, method);
		}
	}
}

export default updateParamsKey;
