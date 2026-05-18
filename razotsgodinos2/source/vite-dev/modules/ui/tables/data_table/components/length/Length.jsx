import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithLocale from './WithLocale';

import Field from 'ui/form/field';
import Select from 'ui/inputs/select';

import styles from './Length.module.less';
import { get, map, replace } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	classNames: PropTypes.object,
	SelectProps: PropTypes.object,
	translations: PropTypes.object,
};

const defaultProps = {
	classNames: {},
	translations: {
		rows: 'rows',
		all: 'all',
	},
	SelectProps: {
		options: [
			{
				value: 10,
				label: '10 :rows',
			},
			{
				value: 20,
				label: '20 :rows',
			},
			{
				value: 50,
				label: '50 :rows',
			},
			{
				value: 100,
				label: '100 :rows',
			},
		],
	},
};

class Length extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const classNames = _g.getClassNames(styles, this.props.classNames);
		const { SelectProps, translations } = this.props;

		const rowsTranslation = get(translations, 'rows', 'rows');
		const allTranslation = get(translations, 'all', 'all');

		let options = get(SelectProps, 'options', []);
		const labelKey = get(SelectProps, 'labelKey', 'label');

		options = map(options, (option) => {
			let label = option[labelKey];

			label = replace(label, ':rows', rowsTranslation);
			label = replace(label, ':all', allTranslation);
			return _g.dotProp.set(option, labelKey, label);
		});

		return (
			<div className={classNames['wrapper']}>
				<Field
					name="length"
					component={Select}
					componentProps={{ ...SelectProps, ...{ options: options } }}
				/>
			</div>
		);
	}
}

Length.propTypes = propTypes;

Length.defaultProps = defaultProps;

Length = WithLocale(Length);

export default Length;
