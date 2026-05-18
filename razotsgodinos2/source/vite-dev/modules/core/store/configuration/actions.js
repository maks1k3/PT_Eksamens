import { UPDATE, SET } from './action_types';
import createAction from 'core/redux/actions/createAction.js';

export const update = payload => {
	return (dispatch, getState) => {
		dispatch(createAction(UPDATE, payload));
	};
};

export const set = payload => {
	return (dispatch, getState) => {
		dispatch(createAction(SET, payload));
	};
};
