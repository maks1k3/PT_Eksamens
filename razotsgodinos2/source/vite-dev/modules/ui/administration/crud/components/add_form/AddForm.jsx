import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import Form from 'ui/form';

const propTypes = {
	tableName: PropTypes.string.isRequired,
	action: PropTypes.string.isRequired,
	addFormProps: PropTypes.object,
	renderAddForm: PropTypes.func,
	uiTranslations: PropTypes.object,
};

const defaultProps = {};

class AddForm extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName } = this.props;

		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">
		const { renderAddForm } = this.props;

		if (_.isFunction(renderAddForm)) {
			return renderAddForm();
		}

		return null;
		//</editor-fold>
	};

	render() {
		const { action, addFormProps, uiTranslations } = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'create',
				}}
				refresh={true}
				onSuccess={this.onSuccess}
				submit={{
					title: _.get(uiTranslations, 'add', 'Add'),
				}}
				{...addFormProps}>
				{this.renderFields()}
			</Form>
		);
	}
}

AddForm.propTypes = propTypes;

AddForm.defaultProps = defaultProps;

export default AddForm;
