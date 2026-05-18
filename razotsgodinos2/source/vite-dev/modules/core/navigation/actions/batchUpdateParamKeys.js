import { forEach, has, isNull } from 'lodash-es';

/**
 * Update multiple query params
 *
 */
function batchUpdateParamKeys(params) {
	const previous = navigation.get();
	const current = navigation.get();
	if (isNull(current.params)) {
		current.params = {};
	}

	if (isNull(previous.params)) {
		previous.params = {};
	}

	forEach(params, (value, key) => {
		if (has(current.params, key)) {
			if (isNull(value)) {
				delete current.params[key];
			} else {
				current.params[key] = value;
			}
		} else {
			if (!isNull(value)) {
				current.params[key] = value;
			}
		}
	});

	if (!_g.areEqualObjects(previous, current)) {
		navigation.updateParams(current.params);
	}
}

export default batchUpdateParamKeys;
