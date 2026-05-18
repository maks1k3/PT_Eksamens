import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import AddForm from '../add_form';
import Form from 'ui/form';
import Button from 'ui/controls/button';

const propTypes = {
	openPopup: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	autoCreate: PropTypes.bool.isRequired,
	action: PropTypes.string.isRequired,
	addFormProps: PropTypes.object,
	renderAddForm: PropTypes.func,
	popupSettings: PropTypes.object,
	tableName: PropTypes.string,
	uiTranslations: PropTypes.object,
};

const defaultProps = {};

class AddButton extends Component {
	constructor(props) {
		super(props);
	}

	onClick = () => {
		//<editor-fold defaultstate="collapsed" desc="onClick">
		const {
			tableName,
			action,
			title,
			popupSettings,
			addFormProps,
			renderAddForm,
			uiTranslations,
		} = this.props;

		const settings = {
			...{
				title: title,
			},
			...popupSettings,
		};

		openPopup({
			name: 'universal',
			data: {
				tableName: tableName,
				action: action,
				addFormProps: addFormProps,
				renderAddForm: renderAddForm,
				uiTranslations: uiTranslations,
			},
			component: AddForm,
			settings: settings,
		});
		//</editor-fold>
	};

	onAutoCreateSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onAutoCreateSuccess">
		const { tableName, openPopup } = this.props;

		openPopup({ id: response.item.id, tab: 'edit' });

		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	renderAutoCreate = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAutoCreate">
		const { action, title } = this.props;
		return (
			<Form
				action={action}
				extraData={{
					action: 'create',
				}}
				submit={{
					title: title,
					icon: {
						provider: 'icomoon',
						name: 'plus3',
					},
				}}
				submitPosition="left"
				showResponse={false}
				onSuccess={this.onAutoCreateSuccess}
			/>
		);
		//</editor-fold>
	};

	renderAdd = () => {
		//<editor-fold defaultstate="collapsed" desc="renderAdd">
		const { title } = this.props;
		return (
			<Button
				title={title}
				icon={{
					provider: 'icomoon',
					name: 'plus3',
				}}
				onClick={this.onClick}
			/>
		);
		//</editor-fold>
	};

	render() {
		const { autoCreate } = this.props;

		if (autoCreate) {
			return this.renderAutoCreate();
		} else {
			return this.renderAdd();
		}
	}
}

AddButton.propTypes = propTypes;

AddButton.defaultProps = defaultProps;

export default AddButton;
