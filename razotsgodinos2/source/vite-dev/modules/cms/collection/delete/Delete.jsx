import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';

import refreshCollection from 'helpers/collections/refreshCollection';

import DeleteButton from 'ui/misc/delete_button';
import { isFunction } from 'lodash-es';

const propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	collectionId: PropTypes.number.isRequired,
	onSuccess: PropTypes.func,

	DeleteButtonProps: PropTypes.object,
};

const defaultProps = {};

class Delete extends Component {
	constructor(props) {
		super(props);
	}

	/* ========================================================================*
	 *
	 *                     Methods
	 *
	 * ========================================================================*/

	onSuccess = () => {
		//<editor-fold defaultstate="collapsed" desc="onSuccess">
		const { name, collectionId, onSuccess } = this.props;
		refreshCollection(name, collectionId);

		closePopup({ name: 'cms' });

		if (isFunction(onSuccess)) {
			onSuccess();
		}
		//</editor-fold>
	};

	render() {
		const { id, DeleteButtonProps } = this.props;
		return (
			<DeleteButton
				action="cms/administration/collection_item"
				extraData={{
					action: 'delete',
					id: id,
				}}
				onSuccess={this.onSuccess}
				{...DeleteButtonProps}
			/>
		);
	}
}

Delete.propTypes = propTypes;

Delete.defaultProps = defaultProps;

export default Delete;
