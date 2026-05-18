import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import DeleteButton from 'ui/misc/delete_button';

const propTypes = {
	id: PropTypes.number.isRequired,
	action: PropTypes.string.isRequired,
	containerName: PropTypes.string.isRequired,
	popupName: PropTypes.string.isRequired,
	tableName: PropTypes.string.isRequired,
};

const defaultProps = {};

class Delete extends Component {
	constructor(props) {
		super(props);
	}

	onSuccess = ({ response }) => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { tableName, popupName } = this.props;
		closePopup({ name: popupName });
		ee.trigger(events.datatable.refresh, { id: tableName });

		uiStore.multiSet([
			{
				path: 'SelectOptions.blogCategories',
				value: response.blogCategories,
			},
		]);
		//</editor-fold>
	};

	render() {
		const { action, id } = this.props;
		return (
			<DeleteButton
				action={action}
				extraData={{
					action: 'delete',
					id: id,
				}}
				onSuccess={this.onSuccess}
			/>
		);
	}
}

Delete.propTypes = propTypes;

Delete.defaultProps = defaultProps;

export default Delete;
