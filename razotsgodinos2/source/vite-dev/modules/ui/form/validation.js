import { has, replace } from 'lodash-es';
import validator from 'validator';

const validation = {
	isRequired: ({ value, validationProp, msg }) => {
		//<editor-fold defaultstate="collapsed" desc="isRequired">
		if (validationProp && value.length === 0) {
			return {
				passed: false,
				msg: msg,
			};
		} else {
			return {
				passed: true,
			};
		}
		//</editor-fold>
	},

	mustAccept: ({ value, validationProp, Field, msg }) => {
		//<editor-fold defaultstate="collapsed" desc="isRequired">
		if (validationProp && value === '0') {
			const title = has(Field.props.label)
				? Field.props.label
				: Field.props.name;
			return {
				passed: false,
				msg: replace(msg, ':title', title),
			};
		} else {
			return {
				passed: true,
			};
		}
		//</editor-fold>
	},

	isEmail: ({ value, validationProp, msg }) => {
		//<editor-fold defaultstate="collapsed" desc="isEmail">
		if (validationProp && value.length > 0 && !validator.isEmail(value)) {
			return {
				passed: false,
				msg: msg,
			};
		} else {
			return {
				passed: true,
			};
		}
		//</editor-fold>
	},

	isEqualTo: ({ value, validationProp: compare, Form, msg }) => {
		//<editor-fold defaultstate="collapsed" desc="isEqualTo">
		if (value !== Form.fields[compare].getValue()) {
			return {
				passed: false,
				msg: msg,
			};
		} else {
			return {
				passed: true,
			};
		}
		//</editor-fold>
	},

	isValidUrl: ({ value, validationProp, msg }) => {
		//<editor-fold defaultstate="collapsed" desc="isValidUrl">
		if (
			validationProp &&
			value.length > 0 &&
			!validator.isURL(value, {
				require_protocol: true,
			})
		) {
			return {
				passed: false,
				msg: msg,
			};
		} else {
			return {
				passed: true,
			};
		}
		//</editor-fold>
	},

	min: ({ value, validationProp: min, msg }) => {
		//<editor-fold defaultstate="collapsed" desc="min">
		if (value.length > 0 && value.length < min) {
			return {
				passed: false,
				msg: replace(msg, ':min', min),
			};
		} else {
			return {
				passed: true,
			};
		}
		//</editor-fold>
	},
};

export default validation;
