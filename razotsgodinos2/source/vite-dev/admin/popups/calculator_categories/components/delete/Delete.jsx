import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'ui/misc/delete_button';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
};

class Delete extends Component {
	onSuccess = () => {
		closePopup({ name: this.props.popupName });
		ee.trigger(events.datatable.refresh, { id: this.props.tableName });
	};

	render() {
		return (
			<DeleteButton
				action={this.props.action}
				extraData={{ action: 'delete', id: this.props.id }}
				onSuccess={this.onSuccess}
			/>
		);
	}
}

Delete.propTypes = propTypes;

export default Delete;
