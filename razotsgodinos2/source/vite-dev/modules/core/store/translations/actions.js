import { UPDATE, SET } from './action_types';
import createAction from 'core/redux/actions/createAction.js';

export const update = payload => {
	return dispatch => {
		dispatch(createAction(UPDATE, payload));
	};
};

export const set = payload => {
	return dispatch => {
		dispatch(createAction(SET, payload));
	};
};
