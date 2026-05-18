import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'ui/misc/delete_button';

const propTypes = {
	id: PropTypes.any.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
	closePopup: PropTypes.func.isRequired,
	deleteFormProps: PropTypes.object,
};

const defaultProps = {};

class Delete extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName, closePopup } = this.props;
		closePopup();
		ee.trigger(events.datatable.refresh, { id: tableName });
		//</editor-fold>
	};

	render() {
		const { action, id, deleteFormProps } = this.props;
		return (
			<DeleteButton
				action={action}
				extraData={{
					action: 'delete',
					id: id,
				}}
				onSuccess={this.onSuccess}
				FormProps={deleteFormProps}
			/>
		);
	}
}

Delete.propTypes = propTypes;

Delete.defaultProps = defaultProps;

export default Delete;
