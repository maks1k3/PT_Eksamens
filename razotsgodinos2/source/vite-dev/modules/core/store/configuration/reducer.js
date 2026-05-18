import { UPDATE, SET } from './action_types';
import createReducer from 'core/redux/reducers/createReducer';
const initial_state = {};

const modificators = {
	/*** UPDATE ***/
	[UPDATE](state, data) {
		return { ...state, ...data };
	},

	/*** SET ***/
	[SET](state, data) {
		return data;
	},
};

export default createReducer(initial_state, modificators);
