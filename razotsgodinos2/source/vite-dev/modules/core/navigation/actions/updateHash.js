/**
 * Update location params
 *
 */
function updateHash(hash, method = 'push') {
	const current = navigation.get();

	navigation.redirect(
		{
			path: current.path,
			params: current.params,
			hash: hash,
			state: current.state,
		},
		method,
	);
}

export default updateHash;
