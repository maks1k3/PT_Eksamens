import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'ui/misc/delete_button';

class Delete extends Component {
	onSuccess = () => {
		const { tableName, popupName } = this.props;

		closePopup({ name: popupName });
		ee.trigger(events.datatable.refresh, { id: tableName });
	};

	render() {
		const { action, id } = this.props;

		return (
			<DeleteButton
				action={action}
				extraData={{
					action: 'delete',
					id,
				}}
				onSuccess={this.onSuccess}
			/>
		);
	}
}

Delete.propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
};

export default Delete;
