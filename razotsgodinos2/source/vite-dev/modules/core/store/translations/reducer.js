import { UPDATE, SET } from './action_types';
import createReducer from 'core/redux/reducers/createReducer';

const initial_state = {};

const modificators = {
	[UPDATE](state, action) {
		return { ...state, ...action };
	},
	[SET](state, data) {
		return data;
	},
};

export default createReducer(initial_state, modificators);
