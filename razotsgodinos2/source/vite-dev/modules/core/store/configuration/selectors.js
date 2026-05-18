export const getNavigationMode = state =>
	_.has(state.configuration, 'navigationMode')
		? state.configuration.navigationMode
		: 'navigation';
