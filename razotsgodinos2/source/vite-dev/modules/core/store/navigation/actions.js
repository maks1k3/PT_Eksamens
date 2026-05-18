import { PUSH } from './action_types';
import { isUndefined } from 'lodash-es';
import createAction from 'core/redux/actions/createAction.js';

export const push = ({ action, path, params, hash, state }) => {
	return (dispatch) => {
		const payload = {
			action: !isUndefined(action) ? action : 'PUSH',
			path: !isUndefined(path) ? path : '/',
			params: !isUndefined(params) ? params : null,
			hash: !isUndefined(hash) ? hash : null,
			state: !isUndefined(state) ? state : null,
		};

		dispatch(createAction(PUSH, payload));
	};
};
