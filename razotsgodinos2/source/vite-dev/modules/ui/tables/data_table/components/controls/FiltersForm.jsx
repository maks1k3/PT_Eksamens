import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import LocaleProvider from 'ui/misc/locale_provider';
import { get, isUndefined, map, set } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	filters: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string,
			name: PropTypes.string,
			component: PropTypes.any,
			componentProps: PropTypes.object,
			fieldProps: PropTypes.object,
			optionsFromUrl: PropTypes.bool,
		}),
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
	submit: PropTypes.string,
	locale: PropTypes.string,

	//from ui
	values: PropTypes.object,
	options: PropTypes.object,
};

const defaultProps = {
	submit: 'Filter',
	locale: 'en',
	//from ui
	values: {},
	options: {},
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			filters: 'values',
			options: 'options',
		},
	};
};

class FiltersForm extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">
		const { filters, values, options } = this.props;

		return map(filters, (column) => {
			const { label, name, component, optionsFromUrl, fieldProps } = column;
			const value = get(values, name);

			let { componentProps } = column;

			if (optionsFromUrl) {
				const item_options = get(options, name);
				if (!isUndefined(item_options)) {
					componentProps = _g.cloneDeep(componentProps);
					set(componentProps, 'options', item_options);
				}
			}

			return (
				<Field
					key={name}
					label={label}
					name={name}
					value={value}
					component={component}
					componentProps={componentProps}
					{...fieldProps}
				/>
			);
		});
		//</editor-fold>
	};

	render() {
		const { onSubmit, submit, locale } = this.props;
		return (
			<LocaleProvider locale={locale}>
				<Form
					submit={{
						title: submit,
					}}
					onSubmit={onSubmit}>
					{this.renderFields()}
				</Form>
			</LocaleProvider>
		);
	}
}

FiltersForm.propTypes = propTypes;

FiltersForm.defaultProps = defaultProps;

FiltersForm = WithUi(uiProps)(FiltersForm);

export default FiltersForm;
