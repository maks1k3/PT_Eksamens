import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';
import Field from 'ui/form/field';
import Checkbox from 'ui/inputs/checkbox';

import styles from './ColumnsVisibilityForm.module.less';
import { every, forEach, get, isString, map, unset } from 'lodash-es';

const propTypes = {
	id: PropTypes.string.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			title: PropTypes.string,
		}),
	).isRequired,
	onSubmit: PropTypes.func.isRequired,
	submit: PropTypes.string,
	toggleAll: PropTypes.string,

	//from ui
	values: PropTypes.object,
};

const defaultProps = {
	submit: 'Apply',
	toggleAll: 'Toggle all',

	//from ui
	values: {},
};

const uiProps = (ownProps) => {
	return {
		[ownProps.id]: {
			columnsVisibility: 'values',
		},
	};
};

class ColumnsVisibilityForm extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	getToggleAllValue = () => {
		//<editor-fold defaultstate="collapsed" desc="getToggleAllValue">
		const { values } = this.props;
		const isAllActive = every(values, (o) => {
			if (isString(o)) {
				return o === '1';
			} else {
				return true;
			}
		});

		return isAllActive ? '1' : '0';
		//</editor-fold>
	};

	onChange = ({ Form, changed, value }) => {
		//<editor-fold defaultstate="collapsed" desc="onChange">

		if (changed === '__toggle_all') {
			const update = {};

			forEach(Form.fields, (field, name) => {
				if (name !== '__toggle_all') {
					update[name] = value;
				}
			});

			Form.update(update);
		}
		//</editor-fold>
	};

	onBeforeSubmit = ({ data }) => {
		//<editor-fold defaultstate="collapsed" desc="onBeforeSubmit">
		unset(data, '__toggle_all');
		//</editor-fold>
	};

	/* ========================================================================*
	 *
	 *                     Renderers
	 *
	 * ========================================================================*/

	renderColumns = () => {
		//<editor-fold defaultstate="collapsed" desc="renderColumns">
		const { columns, values } = this.props;

		return map(columns, (column) => {
			if (!get(column, 'isHidable', true)) {
				return null;
			}

			const { name, title } = column;
			const value = get(values, name, '1');
			return (
				<div key={name} className={styles['item']}>
					<Field
						name={name}
						value={value}
						component={Checkbox}
						componentProps={{
							label: title,
						}}
					/>
				</div>
			);
		});
		//</editor-fold>
	};

	render() {
		const { onSubmit, submit, toggleAll } = this.props;
		return (
			<Form
				submit={{
					title: submit,
				}}
				onBeforeSubmit={this.onBeforeSubmit}
				onChange={this.onChange}
				onSubmit={onSubmit}>
				<div className={styles['item']}>
					<Field
						name="__toggle_all"
						value={this.getToggleAllValue()}
						component={Checkbox}
						componentProps={{
							label: toggleAll,
						}}
					/>
				</div>
				{this.renderColumns()}
			</Form>
		);
	}
}

ColumnsVisibilityForm.propTypes = propTypes;

ColumnsVisibilityForm.defaultProps = defaultProps;

export default WithUi(uiProps)(ColumnsVisibilityForm);
