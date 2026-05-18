import { isNull, isObject, isUndefined } from 'lodash-es';
import queryString from 'query-string';
/**
 * Redirect
 *
 */
function redirect({ path, params, hash, state }, method = 'push') {
	if (isUndefined(navigation_history)) {
		return;
	}
	let _path = path;

	if (!isUndefined(params) && !isNull(params)) {
		_path += '?' + queryString.stringify(params);
	}

	if (!isUndefined(hash) && !isNull(hash)) {
		_path += '#' + hash;
	}

	if (isObject(state) && !isNull(state)) {
		if (method === 'push') {
			navigation_history.push(_path, state);
		} else if (method === 'replace') {
			navigation_history.replace(_path, state);
		}
	} else {
		if (method === 'push') {
			navigation_history.push(_path);
		} else if (method === 'replace') {
			navigation_history.replace(_path);
		}
	}
}

export default redirect;
