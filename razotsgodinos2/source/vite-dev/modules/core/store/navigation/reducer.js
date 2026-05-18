import { PUSH } from './action_types';
import createReducer from 'core/redux/reducers/createReducer';

const initial_state = {
	previous: {
		action: null,
		path: null,
		params: null,
		hash: null,
		state: null,
	},
	current: {
		action: null,
		path: '/',
		params: null,
		hash: null,
		state: null,
	},
	replace: false,
};

const modificators = {
	[PUSH](state, action) {
		const new_state = {
			previous: {
				action: state.current.action,
				path: state.current.path,
				params: state.current.params,
				hash: state.current.hash,
				state: state.current.state,
			},
			current: {
				action: action.action,
				path: action.path,
				params: action.params,
				hash: action.hash,
				state: action.state,
			},
		};
		new_state.replace = false;

		if (new_state.previous.path === new_state.current.path) {
			if (new_state.previous.hash === new_state.current.hash) {
				if (
					_g.areEqualObjects(
						new_state.previous.params,
						new_state.current.params,
					)
				) {
					new_state.replace = true;
					// ee.trigger(events.navigation.replace);
				}
			}
		}

		return { ...state, ...new_state };
	},
};

export default createReducer(initial_state, modificators);
