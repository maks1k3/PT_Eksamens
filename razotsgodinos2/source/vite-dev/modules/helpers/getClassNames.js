/**
 *  Get classNames
 *
 *
 *
 * @param {Object} styles - default classNames
 * @param {Object} classNames - overridden classNames

 */
import { forEach, has, clone } from 'lodash-es';
function getClassNames(styles, classNames = {}) {
	const result = clone(classNames);

	forEach(styles, (value, key) => {
		if (!has(result, key)) {
			result[key] = value;
		}
	});

	return result;
}

export default getClassNames;
