import { isNull } from 'lodash-es';

/**
 * Update location params
 *
 */
function updateParams(params, method = 'push') {
	const current = navigation.get();
	if (isNull(current.params)) {
		current.params = {};
	}

	if (_g.areEqualObjects(current.params, params)) {
		return;
	}

	navigation.redirect(
		{ path: current.path, params, hash: current.hash, state: current.state },
		method,
	);
}

export default updateParams;
