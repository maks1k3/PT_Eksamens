import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import WithUi from 'hoc/store/ui';

import Form from 'ui/form';

const propTypes = {
	id: PropTypes.any.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	renderEditForm: PropTypes.func,
	editFormProps: PropTypes.object,
	uiTranslations: PropTypes.object,
	//from ui
	data: PropTypes.object,
};

const defaultProps = {};

const uiProps = ownProps => {
	return {
		[ownProps.containerName]: {
			data: 'data',
		},
	};
};

class Edit extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName, containerName } = this.props;
		ee.trigger(events.datatable.refresh, { id: tableName });

		if (uiStore.get(`${containerName}.mounted`, false)) {
			uiStore.set(`${containerName}.data.item`, response.item);
		}
		//</editor-fold>
	};

	renderFields = () => {
		//<editor-fold defaultstate="collapsed" desc="renderFields">
		const { data, renderEditForm } = this.props;

		if (_.isFunction(renderEditForm)) {
			return renderEditForm({ data, Edit: this });
		}

		return null;
		//</editor-fold>
	};

	render() {
		const {
			action,
			id,
			editFormProps,

			uiTranslations,
		} = this.props;

		return (
			<Form
				action={action}
				extraData={{
					action: 'update',
					id: id,
				}}
				onSuccess={this.onSuccess}
				submit={{
					title: _.get(uiTranslations, 'save', 'Save'),
				}}
				{...editFormProps}>
				{this.renderFields()}
			</Form>
		);
	}
}

Edit.propTypes = propTypes;

Edit.defaultProps = defaultProps;

Edit = WithUi(uiProps)(Edit);

export default Edit;
