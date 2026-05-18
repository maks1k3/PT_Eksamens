import {
	ADD_FORM,
	REGISTER_INPUT,
	UNREGISTER_INPUT,
	CHANGE_INPUT,
	EXTERNAL_CHANGE_INPUT,
	UPDATE_FORM,
	REMOVE_FORM,
} from './action_types';
import { getForm, getInput } from './selectors';
import createAction from 'core/redux/actions/createAction.js';

export const addForm = formName => {
	return (dispatch, getState) => {
		if (_.isNull(getForm(getState(), formName))) {
			dispatch(createAction(ADD_FORM, formName));
		}
	};
};

export const registerInput = (formName, inputName) => {
	return (dispatch, getState) => {
		if (_.isNull(getInput(getState(), formName, inputName))) {
			dispatch(createAction(REGISTER_INPUT, { formName, inputName }));
		}
	};
};

export const unRegisterInput = (formName, inputName) => {
	return (dispatch, getState) => {
		if (!_.isNull(getInput(getState(), formName, inputName))) {
			dispatch(createAction(UNREGISTER_INPUT, { formName, inputName }));
		}
	};
};

export const changeInput = (formName, inputName, value) => {
	return dispatch => {
		if (_.isUndefined(value)) {
			value = '';
		}
		dispatch(createAction(CHANGE_INPUT, { formName, inputName, value }));
	};
};

export const externalChangeInput = (formName, inputName, value) => {
	return dispatch => {
		if (_.isUndefined(value)) {
			value = '';
		}
		dispatch(
			createAction(EXTERNAL_CHANGE_INPUT, {
				formName,
				inputName,
				value,
				hash: _g.generateShortId(),
			}),
		);
	};
};

export const updateForm = (formName, values) => {
	return dispatch => {
		if (_g.isEmpty(values)) {
			return;
		}
		const data = {};
		_.forEach(values, (value, key) => {
			data[key] = {
				name: key,
				value: value,
				hash: _g.generateShortId(),
			};
		});
		dispatch(createAction(UPDATE_FORM, { formName, data }));
	};
};

export const removeForm = formName => {
	return (dispatch, getState) => {
		if (!_.isNull(getForm(getState(), formName))) {
			dispatch(createAction(REMOVE_FORM, formName));
		}
	};
};
