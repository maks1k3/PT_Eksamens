import {
	ADD_FORM,
	REGISTER_INPUT,
	UNREGISTER_INPUT,
	CHANGE_INPUT,
	EXTERNAL_CHANGE_INPUT,
	UPDATE_FORM,
	REMOVE_FORM,
} from './action_types';
import createReducer from 'core/redux/reducers/createReducer';

const initial_state = {};

const modificators = {
	/*** ADD_FORM ***/
	[ADD_FORM](state, formName) {
		let new_state = {};
		new_state[formName] = {};

		return { ...state, ...new_state };
	},

	/*** REGISTER_INPUT ***/
	[REGISTER_INPUT](state, data) {
		const { formName, inputName } = data;

		const form = _.get(state, formName, {});

		return {
			...state,
			[formName]: {
				...form,
				[inputName]: {
					value: '',
					hash: null,
				},
			},
		};
	},

	/*** UNREGISTER_INPUT ***/
	[UNREGISTER_INPUT](state, data) {
		const { formName, inputName } = data;
		return _g.removeNestedKey(state, formName, inputName);
	},

	/*** CHANGE_INPUT ***/
	[CHANGE_INPUT](state, data) {
		const { formName, inputName, value } = data;

		const form = _.get(state, formName, {});
		const input = _.get(form, inputName, {});

		return {
			...state,
			[formName]: {
				...form,
				[inputName]: {
					...input,
					value: value,
					hash: _.get(input, 'hash', null),
				},
			},
		};
	},

	/*** EXTERNAL_CHANGE_INPUT ***/
	[EXTERNAL_CHANGE_INPUT](state, data) {
		const { formName, inputName, value, hash } = data;

		const form = _.get(state, formName, {});
		const input = _.get(form, inputName, {});

		return {
			...state,
			[formName]: {
				...form,
				[inputName]: {
					...input,
					value: value,
					hash: hash,
				},
			},
		};
	},

	/*** UPDATE_FORM ***/
	[UPDATE_FORM](state, payload) {
		const { formName, data } = payload;
		const new_values = {};
		const current_values = _.get(state, formName, {});

		_.forEach(current_values, (o, key) => {
			new_values[key] = {
				value: o.value,
				hash: o.hash,
			};
		});

		_.forEach(data, o => {
			new_values[o.name] = {
				value: o.value,
				hash: o.hash,
			};
		});

		const form = _.get(state, formName, {});

		return {
			...state,
			[formName]: {
				...form,
				...new_values,
			},
		};
	},

	/*** REMOVE_FORM ***/
	[REMOVE_FORM](state, formName) {
		return _.omit(state, formName);
	},
};

export default createReducer(initial_state, modificators);
